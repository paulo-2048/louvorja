import { ad as Event, ab as Dispatcher, G as openBlock, K as createElementBlock, y as createVNode, I as withCtx, ac as createCommentVNode, R as resolveComponent, J as createTextVNode } from "./_plugin-vue_export-helper-7660c2c6.js";
const _hoisted_1 = { class: "d-flex align-center justify-center fill-height" };
const _hoisted_2 = {
  key: 0,
  class: "white flex-grow-1 fill-height",
  style: { "overflow": "auto" }
};
const _sfc_main = {
  __name: "Tools",
  setup(__props) {
    const event = Event.create("center", "add", {
      template: "<h1 data-id='title' style='font-size: 10vh'>Louvor JA</h1>",
      animate: {
        cssClass: "animate__animated animate__fadeIn animate__faster"
      }
    });
    const dispatcher = new Dispatcher();
    dispatcher.register();
    window.addEventListener(
      "beforeunload",
      function(e) {
        dispatcher == null ? void 0 : dispatcher.unregister();
      },
      false
    );
    const add = () => {
      dispatcher.send(event);
    };
    const clear = () => {
      dispatcher.send(
        event.with({
          layer: "*",
          command: "clear",
          args: {
            animate: {
              cssClass: "animate__animated animate__fadeOut animate__faster"
            },
            delay: 500
          }
        })
      );
    };
    const rm = () => {
      dispatcher.send(
        event.with({
          layer: "center",
          command: "remove",
          args: {
            dataId: "title",
            animate: {
              cssClass: "animate__animated animate__fadeOut animate__faster"
            },
            delay: 500
          }
        })
      );
    };
    return (_ctx, _cache) => {
      const _component_v_btn = resolveComponent("v-btn");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_v_btn, {
          onClick: _cache[0] || (_cache[0] = ($event) => add())
        }, {
          default: withCtx(() => [
            createTextVNode("add")
          ]),
          _: 1
        }),
        createVNode(_component_v_btn, {
          onClick: _cache[1] || (_cache[1] = ($event) => rm())
        }, {
          default: withCtx(() => [
            createTextVNode("rm")
          ]),
          _: 1
        }),
        createVNode(_component_v_btn, {
          onClick: _cache[2] || (_cache[2] = ($event) => clear())
        }, {
          default: withCtx(() => [
            createTextVNode("clear")
          ]),
          _: 1
        }),
        _ctx.debug ? (openBlock(), createElementBlock("div", _hoisted_2)) : createCommentVNode("", true)
      ]);
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHMtYjg0YjEwNzIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9Ub29scy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGFsaWduLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmaWxsLWhlaWdodFwiPlxuICAgIDx2LWJ0biBAY2xpY2s9XCJhZGQoKVwiPmFkZDwvdi1idG4+XG4gICAgPHYtYnRuIEBjbGljaz1cInJtKClcIj5ybTwvdi1idG4+XG4gICAgPHYtYnRuIEBjbGljaz1cImNsZWFyKClcIj5jbGVhcjwvdi1idG4+XG5cbiAgICA8IS0tIDxpY28gc3JjPVwibG91dm9yamFcIiBzaXplPVwiMTAwXCIgLz4gLS0+XG4gICAgPGRpdlxuICAgICAgdi1pZj1cImRlYnVnXCJcbiAgICAgIGNsYXNzPVwid2hpdGUgZmxleC1ncm93LTEgZmlsbC1oZWlnaHRcIlxuICAgICAgc3R5bGU9XCJvdmVyZmxvdzogYXV0b1wiXG4gICAgPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBEaXNwYXRjaGVyLCBFdmVudCB9IGZyb20gXCJAbG91dm9yamEvc2hhcmVkXCI7XG4vKlxuICogIERJU1BBQ1RIRVJcbiAqL1xuXG5jb25zdCBldmVudCA9IEV2ZW50LmNyZWF0ZShcImNlbnRlclwiLCBcImFkZFwiLCB7XG4gIHRlbXBsYXRlOiBcIjxoMSBkYXRhLWlkPSd0aXRsZScgc3R5bGU9J2ZvbnQtc2l6ZTogMTB2aCc+TG91dm9yIEpBPC9oMT5cIixcbiAgYW5pbWF0ZToge1xuICAgIGNzc0NsYXNzOiBcImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2ZhZGVJbiBhbmltYXRlX19mYXN0ZXJcIixcbiAgfSxcbn0pO1xuXG5jb25zdCBkaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcbmRpc3BhdGNoZXIucmVnaXN0ZXIoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gIFwiYmVmb3JldW5sb2FkXCIsXG4gIGZ1bmN0aW9uIChlKSB7XG4gICAgZGlzcGF0Y2hlcj8udW5yZWdpc3RlcigpO1xuICB9LFxuICBmYWxzZVxuKTtcblxuY29uc3QgYWRkID0gKCkgPT4ge1xuICBkaXNwYXRjaGVyLnNlbmQoZXZlbnQpO1xufTtcbmNvbnN0IGNsZWFyID0gKCkgPT4ge1xuICBkaXNwYXRjaGVyLnNlbmQoXG4gICAgZXZlbnQud2l0aCh7XG4gICAgICBsYXllcjogXCIqXCIsXG4gICAgICBjb21tYW5kOiBcImNsZWFyXCIsXG4gICAgICBhcmdzOiB7XG4gICAgICAgIGFuaW1hdGU6IHtcbiAgICAgICAgICBjc3NDbGFzczogXCJhbmltYXRlX19hbmltYXRlZCBhbmltYXRlX19mYWRlT3V0IGFuaW1hdGVfX2Zhc3RlclwiLFxuICAgICAgICB9LFxuICAgICAgICBkZWxheTogNTAwLFxuICAgICAgfSxcbiAgICB9KVxuICApO1xufTtcbmNvbnN0IHJtID0gKCkgPT4ge1xuICBkaXNwYXRjaGVyLnNlbmQoXG4gICAgZXZlbnQud2l0aCh7XG4gICAgICBsYXllcjogXCJjZW50ZXJcIixcbiAgICAgIGNvbW1hbmQ6IFwicmVtb3ZlXCIsXG4gICAgICBhcmdzOiB7XG4gICAgICAgIGRhdGFJZDogXCJ0aXRsZVwiLFxuICAgICAgICBhbmltYXRlOiB7XG4gICAgICAgICAgY3NzQ2xhc3M6IFwiYW5pbWF0ZV9fYW5pbWF0ZWQgYW5pbWF0ZV9fZmFkZU91dCBhbmltYXRlX19mYXN0ZXJcIixcbiAgICAgICAgfSxcbiAgICAgICAgZGVsYXk6IDUwMCxcbiAgICAgIH0sXG4gICAgfSlcbiAgKTtcbn07XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBc0JBLFVBQU0sUUFBUSxNQUFNLE9BQU8sVUFBVSxPQUFPO0FBQUEsTUFDMUMsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ1g7QUFBQSxJQUNILENBQUM7QUFFRCxVQUFNLGFBQWEsSUFBSTtBQUN2QixlQUFXLFNBQVE7QUFFbkIsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBLFNBQVUsR0FBRztBQUNYLGlEQUFZO0FBQUEsTUFDYjtBQUFBLE1BQ0Q7QUFBQSxJQUNGO0FBRUEsVUFBTSxNQUFNLE1BQU07QUFDaEIsaUJBQVcsS0FBSyxLQUFLO0FBQUEsSUFDdkI7QUFDQSxVQUFNLFFBQVEsTUFBTTtBQUNsQixpQkFBVztBQUFBLFFBQ1QsTUFBTSxLQUFLO0FBQUEsVUFDVCxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsWUFDSixTQUFTO0FBQUEsY0FDUCxVQUFVO0FBQUEsWUFDWDtBQUFBLFlBQ0QsT0FBTztBQUFBLFVBQ1I7QUFBQSxRQUNQLENBQUs7QUFBQSxNQUNMO0FBQUEsSUFDQTtBQUNBLFVBQU0sS0FBSyxNQUFNO0FBQ2YsaUJBQVc7QUFBQSxRQUNULE1BQU0sS0FBSztBQUFBLFVBQ1QsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsTUFBTTtBQUFBLFlBQ0osUUFBUTtBQUFBLFlBQ1IsU0FBUztBQUFBLGNBQ1AsVUFBVTtBQUFBLFlBQ1g7QUFBQSxZQUNELE9BQU87QUFBQSxVQUNSO0FBQUEsUUFDUCxDQUFLO0FBQUEsTUFDTDtBQUFBLElBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
