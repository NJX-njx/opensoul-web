import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import './custom.css';
import Warning from './components/Warning.vue';
import Accordion from './components/Accordion.vue';
import AccordionGroup from './components/AccordionGroup.vue';
import Tabs from './components/Tabs.vue';
import Tab from './components/Tab.vue';
import Steps from './components/Steps.vue';
import Step from './components/Step.vue';
import Info from './components/Info.vue';
import Note from './components/Note.vue';
import Tip from './components/Tip.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Warning', Warning);
    app.component('Accordion', Accordion);
    app.component('AccordionGroup', AccordionGroup);
    app.component('Tabs', Tabs);
    app.component('Tab', Tab);
    app.component('Steps', Steps);
    app.component('Step', Step);
    app.component('Info', Info);
    app.component('Note', Note);
    app.component('Tip', Tip);
  }
};
