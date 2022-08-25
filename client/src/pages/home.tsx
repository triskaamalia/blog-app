import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
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
import content from "./new.jpg";

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
        <Container className="mt-5 flex flex-row" >
           <img src={content} alt="" className="float-right" />
           <h5 className="p-5">Blog is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject.
           Let's make your own blog here, also you can see someone else blog!
           </h5> 
        </Container>
      <Container className="mt-5">
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
    </Container>
  );
}

export default HomePage;