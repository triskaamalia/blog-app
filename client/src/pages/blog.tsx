import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ErrorText from "../components/ErrorText";
import Header from "../components/header";
import LoadingComponent, { Loading } from "../components/loading";
import Navigation from "../components/navigation";
import config from "../config/config";
import UserContext from "../contexts/user";
import IBlog from "../interfaces/blog";
import IPageProps from "../interfaces/page"; 
import IUser from "../interfaces/user";

const BlogPage: React.FunctionComponent<IPageProps & RouteComponentProps<any>> = props =>{
  const [_id, setId] = useState<string>('');
  const [blog, setBlog] = useState<IBlog|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [modal, setModal] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const {user} = useContext(UserContext).userState;
  const history = useHistory();

  useEffect(() => {
    let blogID = props.match.params.blogID;

    if (blogID)
    {
      setId(blogID) 
    }
    else
    {
      history.push('/');
    }
  }, []);

  useEffect(() =>{
    if (_id !== '')
    getBlog();
  }, [_id]);

  const getBlog = async () =>{
    try {
      const response = await axios({
        method : 'GET',
        url: `${config.server.url}/blogs/read/${_id}`,
      });
      if (response.status === (200 || 304))
      {
        setBlog(response.data.blog); 
    }
    else{
      setError(`Unable to retrieve blog ${_id}`);
    }
    
    } 
    catch (error : any) {
      setError(error.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  const deleteBlog = async () =>{
    setDeleting(true);

    try {
      const response = await axios({
        method : 'DELETE',
        url: `${config.server.url}/blogs/${_id}`,
      });
      if (response.status === 200)
      {
        setTimeout(() =>{
          history.push('/');
        }, 2000)
    }
    else{
      setError(`Unable to retrieve blog ${_id}`);
      setDeleting(false);
    }
    
    } 
    catch (error : any) {
      setError(error.message);
      setDeleting(false);
    }
  }

  if (loading) return <LoadingComponent> Loading Blog...</LoadingComponent>;

  if (blog)
  {
    return (
      <Container fluid className="p-0">
        <Navigation />
        <Modal isOpen={modal}>
          <ModalHeader>
            Delete
          </ModalHeader>
          <ModalBody>
            {deleting ?
              <Loading> </Loading>
            :
              "Are you sure want delete this blog?"
            }
            <ErrorText error={error} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => deleteBlog()}>Delete Permanently</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Header
            image={blog.picture || undefined}
            headline={blog.headline}
            title={blog.title}
                > 
        </Header>
        <Container className="mt-5">
            {user._id === (blog.author as IUser)._id &&
              <Container fluid className="p-0">
                  <Button color="info" className="mr-2" tag={Link} to={`/edit/${blog._id}`}><i className="fas fa-edit mr-2"></i>Edit</Button>
                  <Button color="danger" onClick={() => setModal(true)}><i className="far fa-trash-alt mr-2"></i>Delete</Button>
                <hr />
              </Container>
            }
          <ErrorText error={error} />
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Container>

      </Container>
    );
  }
  else 
  {
    return <Redirect to='/' />
  }

}

export default withRouter(BlogPage);