import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container , Card , CardBody , CardSubtitle , CardTitle, CardText, Row, Col } from "reactstrap";
import Header from "../components/header";
import LoadingComponent from "../components/loading";
import Navigation from "../components/navigation";
import config from "../config/config";
import logging from "../config/logging";
import IBlog from "../interfaces/blog";
import IPageProps from "../interfaces/page"; 
import BlogPreview from "../components/BlogPreview";
import IUser from "../interfaces/user";
import ErrorText from "../components/ErrorText";

const HomePage: React.FunctionComponent<IPageProps> = props =>{
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect (() => {
    GetAllBlogs();
  }, [])

  const GetAllBlogs = async () =>{
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.server.url}/blogs`
      });
      if(response.status === 200 || response. status === 304)
      {
        let blogs = response.data.blogs as IBlog[];
        blogs.sort((x,y) => y.updatedAt.localeCompare(x.updatedAt));
        setBlogs(blogs);
      }
    } catch (error) {
      logging.error(error);
      setError ('Unable to retrive blog ');
    }
    finally
    {
      setTimeout(() =>{
        setLoading(false)
      }, 2000);
    }
  }
  if (loading)
  {
    return<LoadingComponent>Loading blogs...</LoadingComponent>
  }

  return(
    <Container fluid className="p-0">
      <Navigation />
        <Header
          headline="Check out what people have to say"
          title="Simple Blog Web"
          children={[]}
        />
      <Row>
        <Col className="p-4">
          <Card
            style={{
              width: '50rem'
            }}
            className=" flex flex-row"
          >
        <Row>
          <Col className=" p-1">
            <CardBody>
            <CardTitle tag="h5">
                What is blog?
              </CardTitle>
              <CardText>
              <p>Blog is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top.</p> 
              <p> It is a platform where a writer or a group of writers share their views on an individual subject. Let's make your own blog here, also you can see someone else blog! </p>
              </CardText>
            </CardBody>
          </Col>
          <Col>
          <CardBody>
            <img
              alt="Card cap"
              src="http://www.deusexmalcontent.com/wp-content/uploads/2022/05/Bagaimana-Memulai-dan-Mengatur-Situs-Web-Blog-dengan-Mudah.jpg"
              width="100%"
              height="85%"
              className="p-2"
            />
            </CardBody>
           </Col>
          </Row>
          </Card>
          </Col>
          <Col className="p-4" >
          <Card
            style={{
              width: "18rem"
            }}
          >
            <CardBody>
              <CardTitle tag="h5">
                Write article
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
              >
                with your favorite topic
              </CardSubtitle>
            </CardBody>
            <img
              alt="Card cap"
              src="https://cdn1-production-images-kly.akamaized.net/TIpuSykzCa6zqGib7rGGAPMdCjs=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3154097/original/087220900_1592297644-collage-female-is-reading-book_1421-3697.jpg"
              width="100%"
            />
            <CardBody>

              <CardText>
                There is many topic you can choose to write your article like lifestyle, sports, health and many more.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className="card text-white bg-primary mb-3" style={{ width: "30rem"}}>
        <div className="card-header">Posted Blog's</div>
      </div>
      <Container className="mt-5" color="secondary">
       { blogs.length === 0 && <p>There are no blogs yet, you should <Link to="/edit">post</Link> one</p>}
       {blogs.map((blog, index) => {
                    return (
                        <div key={index}>
                            <BlogPreview
                                _id={blog._id}
                                author={(blog.author as IUser).name}
                                headline={blog.headline}
                                title={blog.title}
                                createdAt={blog.createdAt}
                                updatedAt={blog.updatedAt} 
                            />
                            <hr />
                        </div>
                    );
                })}
            <ErrorText error={error} />
      </Container>
      <div className=" bg-info mb-3 bottom-0 left-0 p-2 text-center w-full" style={{ height: "4rem"}} >
          <p>&copy; 2022 Triska Amalia Rahmawati</p>
      </div>
    </Container>
  );
}

export default HomePage;