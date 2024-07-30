import { Buffer } from 'buffer';
import process from 'process';
import global from 'global';

window.global = global;
window.Buffer = Buffer;
window.process = process;