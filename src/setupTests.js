// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Workaround for running axios via Jest, see: https://github.com/axios/axios/issues/1754
import axios from "axios";
import adapter from "axios/lib/adapters/http";
axios.defaults.adapter = adapter;