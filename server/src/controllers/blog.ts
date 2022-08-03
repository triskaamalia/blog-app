import {NextFunction, Request, Response} from 'express';
import logging from '../config/logging';
import Blog from '../models/blog';
import mongoose from 'mongoose';

const create = (req: Request, res: Response, next: NextFunction) => {
  logging.info('Attempting to register blog ...');

  let { author, title, content, headline, picture } = req.body;
  

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    author,
    title,
    content,
    headline,
    picture

  });
  return blog
    .save()
    .then((newBlog) => {
      logging.info(`New blog created..`);

        return res.status(200).json({ blog: newBlog });
      })
      .catch((error) => {
        logging.error(error.message);

        return res.status(500).json({
              message: error.message
        });
    });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.blogID;
  logging.info(`Incoming read for blog with id ${_id}`);

  return Blog.findById(_id)
      .populate('author')
      .then((blog) => {
          if (blog) {
              return res.status(200).json({
                  blog: blog
              });
          } else {
              return res.status(404).json({
                  error: 'Blog not found.'
              });
          }
      })
      .catch((error) => {
          logging.error(error.message);

          return res.status(500).json({
              error: error.message
          });
      });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info('Readall route called');

   return Blog.find()
        .populate('author')
        .exec()
        .then((blogs) => {
            return res.status(200).json({
                count: blogs.length,
                blogs: blogs
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const query = (req: Request, res: Response, next: NextFunction) => {
  logging.info('Incoming query..');

   return Blog.find(req.body)
        .populate('author')
        .exec()
        .then((blogs) => {
            return res.status(200).json({
                count: blogs.length,
                blogs: blogs
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.blogID;
  logging.info(`Incoming update for blog with id ${_id}`);

   return Blog.findById(_id)
        .exec()
        .then((blog) => {
            if (blog)
            {
              blog.set(req.body)
              blog.save()
              .then((newBlog) => {
                logging.info(`Blog updated..`);
          
                  return res.status(200).json({ blog: newBlog });
                })
                .catch((error) => {
                  logging.error(error.message);
          
                  return res.status(500).json({
                        message: error.message
                  });
              });
            }
            else
            {
              return res.status(404).json({ error: 'Blog not found.' });
            }
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.blogID;
  logging.warn(`Incoming delet for blog with id ${_id}`);

  return Blog.findByIdAndDelete(_id)
      .exec()
      .then((blog) => {
          if (blog) {
              return res.status(200).json({
                  message: 'Blog delete'
              });
            }
      })
      .catch((error) => {
          logging.error(error.message);

          return res.status(500).json({
              error: error.message
          });
      });
};

export default {
  create,
  read,
  readAll,
  query,
  update,
  deleteBlog
}