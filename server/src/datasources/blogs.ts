import { RESTDataSource } from 'apollo-datasource-rest';
import { Blog } from '../models/blog';

export class BlogsAPI extends RESTDataSource {
    baseURL = 'http://localhost:3002/';

    async getBlog(id: String) {
        return this.get(`blogs/${id}`);
    }

    async getBlogs() {
        return this.get(`blogs`);
    }

    // an example of making an HTTP POST request
    async postBlog(blog: Blog) {
        return this.post(
            `blogs`, // path
            { ...blog } // request body
        );
    }

    // an example of making an HTTP PUT request
    async updateCompleteBlog(blog: Blog) {
        return this.put(
            `blogs/${blog.id}`, // path
            { ...blog } // request body
        );
    }

    // an example of making an HTTP PATCH request
    async updateBlog(blog: Blog) {
        return this.patch(
            `blogs/${blog.id}`, // path
            { ...blog } // request body
        );
    }

    // an example of making an HTTP DELETE request
    async deleteBlog(id: String) {
        return this.delete(
            `blogs/${id}` // path
        );
    }
}