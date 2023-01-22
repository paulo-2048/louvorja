import { _ as _export_sfc, a as ref, E as onMounted, aa as DefaultHandler, ab as Dispatcher, A as onBeforeUnmount, G as openBlock, K as createElementBlock, O as createBaseVNode, a9 as createApp } from "./_plugin-vue_export-helper-7660c2c6.js";
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
class HandlerLoader {
  /** @type(string) */
  async load(target) {
    await new Promise((resolve, reject) => {
      reject("Must be implemented in subclass.");
    });
  }
}
class DefaultHandlerLoader extends HandlerLoader {
  /** @type(string) */
  async load(target) {
    await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({}), `./handlers/${target}.js`);
  }
}
const projection = "";
const Projection_vue_vue_type_style_index_0_scoped_361b3c9b_lang = "";
const _sfc_main = {
  __name: "Projection",
  setup(__props) {
    const wrapper = ref(null);
    const background = ref(null);
    const player = ref(null);
    const main = ref(null);
    const left = ref(null);
    const right = ref(null);
    const top = ref(null);
    const bottom = ref(null);
    const center = ref(null);
    const resizePlayers = (event = null) => {
      var _a;
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      (_a = document.querySelector("video.fullscreen")) == null ? void 0 : _a.forEach((video) => {
        video.width = vw;
        video.height = vh;
      });
    };
    let dispatcher = null;
    onMounted(async () => {
      player.value.querySelector("video");
      const elements = {
        wrapper,
        background,
        player,
        main,
        left,
        right,
        top,
        bottom,
        center
      };
      const loaders = [new DefaultHandlerLoader()];
      const handlers = {};
      for (const target in elements) {
        let handler;
        for (let loader in loaders) {
          try {
            handler = await loader.load(target);
          } catch (error) {
            console.warn(
              `App (projection) import error for ${target}. Will use default instead!`
            );
          }
        }
        handlers[target] = handler || new DefaultHandler(elements[target].value);
      }
      dispatcher = new Dispatcher(handlers);
      dispatcher.register();
      resizePlayers();
    });
    onBeforeUnmount(() => {
      dispatcher == null ? void 0 : dispatcher.unregister();
    });
    window.addEventListener(
      "beforeunload",
      function(e) {
        dispatcher == null ? void 0 : dispatcher.unregister();
      },
      false
    );
    window.onresize = resizePlayers;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "projection-wrapper",
        ref_key: "wrapper",
        ref: wrapper
      }, [
        createBaseVNode("div", {
          class: "projection-background",
          ref_key: "background",
          ref: background
        }, null, 512),
        createBaseVNode("div", {
          class: "projection-player",
          ref_key: "player",
          ref: player
        }, null, 512),
        createBaseVNode("div", {
          class: "projection-main",
          ref_key: "main",
          ref: main
        }, null, 512),
        createBaseVNode("div", {
          class: "projection-left",
          ref_key: "left",
          ref: left
        }, null, 512),
        createBaseVNode("div", {
          class: "projection-right",
          ref_key: "right",
          ref: right
        }, null, 512),
        createBaseVNode("div", {
          class: "projection-top",
          ref_key: "top",
          ref: top
        }, null, 512),
        createBaseVNode("div", {
          class: "projection-bottom",
          ref_key: "bottom",
          ref: bottom
        }, null, 512),
        createBaseVNode("div", {
          class: "projection-center",
          ref_key: "center",
          ref: center
        }, null, 512)
      ], 512);
    };
  }
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-361b3c9b"]]);
const app = createApp(App);
app.mount("#app");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi1mYmFjNmY1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2hhcmVkL3NyYy9ldmVudHMvSGFuZGxlckxvYWRlci5qcyIsIi4uLy4uL3NyYy9Qcm9qZWN0aW9uLnZ1ZSIsIi4uLy4uL3NyYy9wcm9qZWN0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBIYW5kbGVyTG9hZGVyIHtcbiAgLyoqIEB0eXBlKHN0cmluZykgKi9cbiAgYXN5bmMgbG9hZCh0YXJnZXQpIHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZWplY3QoXCJNdXN0IGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzLlwiKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdEhhbmRsZXJMb2FkZXIgZXh0ZW5kcyBIYW5kbGVyTG9hZGVyIHtcbiAgLyoqIEB0eXBlKHN0cmluZykgKi9cbiAgYXN5bmMgbG9hZCh0YXJnZXQpIHtcbiAgICBhd2FpdCBpbXBvcnQoYC4vaGFuZGxlcnMvJHt0YXJnZXR9LmpzYCk7XG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInByb2plY3Rpb24td3JhcHBlclwiIHJlZj1cIndyYXBwZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwicHJvamVjdGlvbi1iYWNrZ3JvdW5kXCIgcmVmPVwiYmFja2dyb3VuZFwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0aW9uLXBsYXllclwiIHJlZj1cInBsYXllclwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0aW9uLW1haW5cIiByZWY9XCJtYWluXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInByb2plY3Rpb24tbGVmdFwiIHJlZj1cImxlZnRcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicHJvamVjdGlvbi1yaWdodFwiIHJlZj1cInJpZ2h0XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInByb2plY3Rpb24tdG9wXCIgcmVmPVwidG9wXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInByb2plY3Rpb24tYm90dG9tXCIgcmVmPVwiYm90dG9tXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInByb2plY3Rpb24tY2VudGVyXCIgcmVmPVwiY2VudGVyXCI+PC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tIFwidnVlXCI7XG5cbmltcG9ydCB7XG4gIERpc3BhdGNoZXIsXG4gIEV2ZW50LFxuICBEZWZhdWx0SGFuZGxlcixcbiAgRGVmYXVsdEhhbmRsZXJMb2FkZXIsXG59IGZyb20gXCJAbG91dm9yamEvc2hhcmVkXCI7XG5cbmNvbnN0IHdyYXBwZXIgPSByZWYobnVsbCk7XG5jb25zdCBiYWNrZ3JvdW5kID0gcmVmKG51bGwpO1xuY29uc3QgcGxheWVyID0gcmVmKG51bGwpO1xuY29uc3QgbWFpbiA9IHJlZihudWxsKTtcbmNvbnN0IGxlZnQgPSByZWYobnVsbCk7XG5jb25zdCByaWdodCA9IHJlZihudWxsKTtcbmNvbnN0IHRvcCA9IHJlZihudWxsKTtcbmNvbnN0IGJvdHRvbSA9IHJlZihudWxsKTtcbmNvbnN0IGNlbnRlciA9IHJlZihudWxsKTtcblxubGV0IHZpZGVvVGFnO1xuXG5jb25zdCByZXNpemVQbGF5ZXJzID0gKGV2ZW50ID0gbnVsbCkgPT4ge1xuICBjb25zdCB2dyA9IE1hdGgubWF4KFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCAwLFxuICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8IDBcbiAgKTtcbiAgY29uc3QgdmggPSBNYXRoLm1heChcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDAsXG4gICAgd2luZG93LmlubmVySGVpZ2h0IHx8IDBcbiAgKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvLmZ1bGxzY3JlZW5cIik/LmZvckVhY2goKHZpZGVvKSA9PiB7XG4gICAgdmlkZW8ud2lkdGggPSB2dztcbiAgICB2aWRlby5oZWlnaHQgPSB2aDtcbiAgfSk7XG59O1xuXG5jb25zdCB0YXJnZXRIYW5kbGVycyA9IHt9O1xuXG5sZXQgZGlzcGF0Y2hlciA9IG51bGw7XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIHZpZGVvVGFnID0gcGxheWVyLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKTtcblxuICBjb25zdCBlbGVtZW50cyA9IHtcbiAgICB3cmFwcGVyLFxuICAgIGJhY2tncm91bmQsXG4gICAgcGxheWVyLFxuICAgIG1haW4sXG4gICAgbGVmdCxcbiAgICByaWdodCxcbiAgICB0b3AsXG4gICAgYm90dG9tLFxuICAgIGNlbnRlcixcbiAgfTtcbiAgY29uc3QgbG9hZGVycyA9IFtuZXcgRGVmYXVsdEhhbmRsZXJMb2FkZXIoKV07XG4gIGNvbnN0IGhhbmRsZXJzID0ge307XG4gIGZvciAoY29uc3QgdGFyZ2V0IGluIGVsZW1lbnRzKSB7XG4gICAgbGV0IGhhbmRsZXI7XG4gICAgZm9yIChsZXQgbG9hZGVyIGluIGxvYWRlcnMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGhhbmRsZXIgPSBhd2FpdCBsb2FkZXIubG9hZCh0YXJnZXQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBBcHAgKHByb2plY3Rpb24pIGltcG9ydCBlcnJvciBmb3IgJHt0YXJnZXR9LiBXaWxsIHVzZSBkZWZhdWx0IGluc3RlYWQhYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVyc1t0YXJnZXRdID0gaGFuZGxlciB8fCBuZXcgRGVmYXVsdEhhbmRsZXIoZWxlbWVudHNbdGFyZ2V0XS52YWx1ZSk7XG4gIH1cbiAgZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKGhhbmRsZXJzKTtcblxuICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCk7XG4gIHJlc2l6ZVBsYXllcnMoKTtcbn0pO1xuXG5vbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICBkaXNwYXRjaGVyPy51bnJlZ2lzdGVyKCk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gIFwiYmVmb3JldW5sb2FkXCIsXG4gIGZ1bmN0aW9uIChlKSB7XG4gICAgZGlzcGF0Y2hlcj8udW5yZWdpc3RlcigpO1xuICB9LFxuICBmYWxzZVxuKTtcblxud2luZG93Lm9ucmVzaXplID0gcmVzaXplUGxheWVycztcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbi5wcm9qZWN0aW9uLXdyYXBwZXIsXG4ucHJvamVjdGlvbi13cmFwcGVyID4gKixcbi5wcm9qZWN0aW9uLXZpZGVvID4gdmlkZW8ge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG5cbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4ucHJvamVjdGlvbi13cmFwcGVyIHtcbiAgJiA+ICogPiAqIHtcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgfVxuXG4gICYgPiAucHJvamVjdGlvbi12aWRlbyB7XG4gIH1cblxuICAmID4gLnByb2plY3Rpb24tdG9wIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6IHJlZDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAmID4gLnByb2plY3Rpb24tYm90dG9tIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6IGJsdWU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1jb250ZW50OiBmbGV4LWVuZDtcbiAgfVxuXG4gICYgPiAucHJvamVjdGlvbi1sZWZ0IHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6IGdyZWVuO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcbiAgfVxuXG4gICYgPiAucHJvamVjdGlvbi1yaWdodCB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgY29sb3I6IHllbGxvdztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtZW5kO1xuICB9XG5cbiAgJiA+IC5wcm9qZWN0aW9uLWNlbnRlciB7XG4gICAgdGV4dC1hbGlnbjoganVzdGlmeTtcbiAgICBjb2xvcjogcGluaztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxufVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBBcHAgZnJvbSBcIi4vUHJvamVjdGlvbi52dWVcIjtcblxuY29uc3QgYXBwID0gY3JlYXRlQXBwKEFwcCk7XG5cbmFwcC5tb3VudChcIiNhcHBcIik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFPLE1BQU0sY0FBYztBQUFBO0FBQUEsRUFFekIsTUFBTSxLQUFLLFFBQVE7QUFDakIsVUFBTSxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFDckMsYUFBTyxrQ0FBa0M7QUFBQSxJQUMvQyxDQUFLO0FBQUEsRUFDRjtBQUNIO0FBRU8sTUFBTSw2QkFBNkIsY0FBYztBQUFBO0FBQUEsRUFFdEQsTUFBTSxLQUFLLFFBQVE7QUFDakIsVUFBTSxxQ0FBQSx1QkFBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLGNBQUEsV0FBQTtBQUFBLEVBQ1A7QUFDSDs7Ozs7O0FDU0EsVUFBTSxVQUFVLElBQUksSUFBSTtBQUN4QixVQUFNLGFBQWEsSUFBSSxJQUFJO0FBQzNCLFVBQU0sU0FBUyxJQUFJLElBQUk7QUFDdkIsVUFBTSxPQUFPLElBQUksSUFBSTtBQUNyQixVQUFNLE9BQU8sSUFBSSxJQUFJO0FBQ3JCLFVBQU0sUUFBUSxJQUFJLElBQUk7QUFDdEIsVUFBTSxNQUFNLElBQUksSUFBSTtBQUNwQixVQUFNLFNBQVMsSUFBSSxJQUFJO0FBQ3ZCLFVBQU0sU0FBUyxJQUFJLElBQUk7QUFJdkIsVUFBTSxnQkFBZ0IsQ0FBQyxRQUFRLFNBQVM7O0FBQ3RDLFlBQU0sS0FBSyxLQUFLO0FBQUEsUUFDZCxTQUFTLGdCQUFnQixlQUFlO0FBQUEsUUFDeEMsT0FBTyxjQUFjO0FBQUEsTUFDekI7QUFDRSxZQUFNLEtBQUssS0FBSztBQUFBLFFBQ2QsU0FBUyxnQkFBZ0IsZ0JBQWdCO0FBQUEsUUFDekMsT0FBTyxlQUFlO0FBQUEsTUFDMUI7QUFDRSxxQkFBUyxjQUFjLGtCQUFrQixNQUF6QyxtQkFBNEMsUUFBUSxDQUFDLFVBQVU7QUFDN0QsY0FBTSxRQUFRO0FBQ2QsY0FBTSxTQUFTO0FBQUEsTUFDbkI7QUFBQSxJQUNBO0FBSUEsUUFBSSxhQUFhO0FBRWpCLGNBQVUsWUFBWTtBQUNULGFBQU8sTUFBTSxjQUFjLE9BQU87QUFFN0MsWUFBTSxXQUFXO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUNFLFlBQU0sVUFBVSxDQUFDLElBQUkscUJBQW9CLENBQUU7QUFDM0MsWUFBTSxXQUFXLENBQUE7QUFDakIsaUJBQVcsVUFBVSxVQUFVO0FBQzdCLFlBQUk7QUFDSixpQkFBUyxVQUFVLFNBQVM7QUFDMUIsY0FBSTtBQUNGLHNCQUFVLE1BQU0sT0FBTyxLQUFLLE1BQU07QUFBQSxVQUNuQyxTQUFRLE9BQVA7QUFDQSxvQkFBUTtBQUFBLGNBQ04scUNBQXFDO0FBQUEsWUFDL0M7QUFBQSxVQUNPO0FBQUEsUUFDRjtBQUNELGlCQUFTLE1BQU0sSUFBSSxXQUFXLElBQUksZUFBZSxTQUFTLE1BQU0sRUFBRSxLQUFLO0FBQUEsTUFDeEU7QUFDRCxtQkFBYSxJQUFJLFdBQVcsUUFBUTtBQUVwQyxpQkFBVyxTQUFRO0FBQ25CO0lBQ0YsQ0FBQztBQUVELG9CQUFnQixNQUFNO0FBQ3BCLCtDQUFZO0FBQUEsSUFDZCxDQUFDO0FBRUQsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBLFNBQVUsR0FBRztBQUNYLGlEQUFZO0FBQUEsTUFDYjtBQUFBLE1BQ0Q7QUFBQSxJQUNGO0FBRUEsV0FBTyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEdsQixNQUFNLE1BQU0sVUFBVSxHQUFHO0FBRXpCLElBQUksTUFBTSxNQUFNOyJ9
