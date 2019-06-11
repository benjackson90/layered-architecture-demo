import DAO from '../dao';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

const dao = new DAO();

class PostServiceModel {
  constructor() {
    this.postModel = dao.createModel('Post', {
      name: { type: 'String', required: true },
      title: { type: 'String', required: true },
      content: { type: 'String', required: true },
      slug: { type: 'String', required: true },
      cuid: { type: 'String', required: true },
      dateAdded: { type: 'Date', default: Date.now, required: true },
    });
  }

  createPostItem(data) {
    const Post = this.postModel;
    return new Post(data);
  }

  addPost(data, cb) {
    const Post = this.postModel;
    const newPost = new Post(data);

    // Let's sanitize inputs
    newPost.title = sanitizeHtml(newPost.title);
    newPost.name = sanitizeHtml(newPost.name);
    newPost.content = sanitizeHtml(newPost.content);

    newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
    newPost.cuid = cuid();
    newPost.save(cb);
  }

  getPosts(cb) {
    const Post = this.postModel;
    dao.find(Post, cb);
  }

  getPost(query, cb) {
    const Post = this.postModel;
    dao.findOne(Post, query, cb);
  }

  deletePost(query, cb) {
    const Post = this.postModel;
    dao.findOne(Post, query, cb);
  }

  count(cb) {
    const Post = this.postModel;
    dao.count(Post, cb);
  }

  create(data, cb) {
    const Post = this.postModel;
    dao.create(Post, data, cb);
  }
}

const PostService = new PostServiceModel();

export default PostService;
