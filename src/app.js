import Vue from "vue";

import {
  Cell,
  CellGroup,
  Field,
  Button,
  NavBar,
  Area,
  Popup,
  Toast,
  Calendar,
  RadioGroup,
  Radio,
  Collapse,
  CollapseItem,
  Checkbox,
  CheckboxGroup,
  Tabbar,
  TabbarItem,
  Image,
  Lazyload,
  PullRefresh,
  Tab,
  Tabs,
  List,
  Icon,
  DatetimePicker,
  Form,
  Picker,
  Uploader,
  Step, Steps,
  Col, Row,
  ActionSheet,
  Switch,
  Search,
  Loading,
  Skeleton,
  Tag,
  Dialog,
  Divider,
  Empty,
  Overlay
} from "vant";

Vue.use(CellGroup);
Vue.use(Cell);
Vue.use(Field);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Area);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Calendar);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Image);
Vue.use(PullRefresh)
Vue.use(Lazyload);
Vue.use(Collapse).use(CollapseItem)
Vue.use(Checkbox)
Vue.use(CheckboxGroup);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Icon);
Vue.use(DatetimePicker);
Vue.use(Form);
Vue.use(Picker);
Vue.use(Uploader);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Col);
Vue.use(Row);
Vue.use(ActionSheet);
Vue.use(Switch);
Vue.use(Search);
Vue.use(Loading);
Vue.use(Skeleton);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Empty);
Vue.use(Overlay);

/**
 * 动态改变某元素宽高
 */
Vue.directive('resize',{ // 指令的名称
  bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
    let width = '', height = '';
    function isResize() {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value(style.width,style.height);  // 关键 绑定函数
      }
      width = style.width
      height = style.height
    }
    el.__vueSetInterval__ = setInterval(isResize, 500);
  },
  unbind(el) {
    clearInterval(el.__vueSetInterval__);
  }
})
