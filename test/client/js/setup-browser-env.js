import 'babel-polyfill';
import { JSDOM } from 'jsdom';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

require('jsdom-global')();

configure({adapter: new Adapter()});
