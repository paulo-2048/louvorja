import * as modules from "../src/_modules.js";

const isWindows = process.platform.startsWith("win");
const meta = { url: `file:///${isWindows ? "C:/" : ""}foo/bar/file.js` };

test("module path", () => {
  expect(modules.path(meta)).toBe(
    isWindows ? "C:\\foo\\bar\\file.js" : "/foo/bar/file.js"
  );
});

test("module filename", () => {
  expect(modules.filename(meta)).toBe("file.js");
});

test("module dirname", () => {
  expect(modules.dirname(meta)).toBe("bar");
});

test("module parent", () => {
  expect(modules.parent(meta)).toBe(isWindows ? "C:\\foo\\bar" : "/foo/bar");
});
