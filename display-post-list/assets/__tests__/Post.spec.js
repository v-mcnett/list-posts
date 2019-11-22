import React from "react";
import renderer from 'react-test-renderer';
import { Post } from "../components/post";

describe("Post component", () => {
  test("Matches the snapshot", () => {
    const post = renderer.create(<Post />);
    expect(post.toJSON()).toMatchSnapshot();
  });
});