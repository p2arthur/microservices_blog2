export default interface EventInterface {
  type: string;
  data: {
    commentId: string;
    content: string;
    postId: string;
    status: string;
    id: string;
    title: string;
  };
}
