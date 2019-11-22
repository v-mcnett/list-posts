import React from "react";
import renderer from 'react-test-renderer';
import { Pagination } from "../components/pagination";

describe("Pagination component", () => {
  test("Matches the snapshot", () => {
    const pagination = renderer.create(<Pagination />);
    expect(pagination.toJSON()).toMatchSnapshot();
  });
});