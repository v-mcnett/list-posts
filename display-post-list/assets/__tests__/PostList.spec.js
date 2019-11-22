import React from "react";
import renderer from 'react-test-renderer';
import { PostList } from "../components/postList";

describe("PostList component", () => {
  test("Matches the snapshot", () => {
    const postList = renderer.create(<PostList />);
    expect(postList.toJSON()).toMatchSnapshot();
  });
});