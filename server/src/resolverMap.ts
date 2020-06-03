import { GraphQLResolveInfo } from 'graphql';
import { Context, Blog } from './models';
import { IResolvers } from 'graphql-tools';

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void, ctx: Context, info: GraphQLResolveInfo): string {
      return `👋 Hello world! 👋`;
    },
    blogs(_: void, args: void, { dataSources }: any, info: GraphQLResolveInfo): Blog[] {
      return dataSources.blogsDataAPI.getBlogs();
    },
    blog(_: void, args: any, { dataSources }: any, info: GraphQLResolveInfo): Blog {
      const blog = dataSources.blogsDataAPI.getBlog(args.id);
      return blog;
    }
  },
  Mutation: {
    deleteBlog(_: void, args: any, { dataSources }: any, info: GraphQLResolveInfo): String {
      const blog = dataSources.blogsDataAPI.deleteBlog(args.id);
      return "Blog Deleted Successfully";
    },
    updateBlog(_: void, args: any, { dataSources }: any, info: GraphQLResolveInfo): Blog {
      const blog = dataSources.blogsDataAPI.updateBlog(args.blog);
      return blog;
    },
    updateCompleteBlog(_: void, args: any, { dataSources }: any, info: GraphQLResolveInfo): Blog {
      const blog = dataSources.blogsDataAPI.updateCompleteBlog(args.blog);
      return blog;
    },
    postBlog(_: void, args: any, { dataSources }: any, info: GraphQLResolveInfo): Blog {
      const blog = dataSources.blogsDataAPI.postBlog(args.blog);
      return blog;
    }
  }
};

export default resolverMap;
