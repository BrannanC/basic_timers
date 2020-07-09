(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _basic_timers = require("basic_timers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var timer = init_timer();

var _document$getElements = document.getElementsByClassName("container"),
    _document$getElements2 = _slicedToArray(_document$getElements, 1),
    container = _document$getElements2[0];

var _document$getElements3 = document.getElementsByClassName("display"),
    _document$getElements4 = _slicedToArray(_document$getElements3, 1),
    display = _document$getElements4[0];

var pause = document.querySelector(".control .pause");

pause.onclick = function () {
  return timer.pause();
};

var start = document.querySelector(".control .start");

start.onclick = function () {
  return timer.start();
};

var stop = document.querySelector(".control .stop");

stop.onclick = function () {
  return timer.stop();
};

function init_timer() {
  var timer = new _basic_timers.Timer({
    on_start: on_start,
    on_end: on_end,
    on_update: on_update,
    on_pause: on_pause,
    on_resume: on_resume
  });
  return timer;
}

var STATUS = {
  RUNNING: "running",
  STOPPED: "stopped",
  PAUSED: "paused"
};

function remove_all_status() {
  var _container$classList;

  (_container$classList = container.classList).remove.apply(_container$classList, _toConsumableArray(Object.values(STATUS)));
}

function set_status(status) {
  remove_all_status();
  container.classList.add(status);
}

function on_start() {
  console.log("start");
  set_status(STATUS.RUNNING);
}

function on_end() {
  set_status(STATUS.STOPPED);
  display.textContent = "0";

  pause.onclick = function () {
    return on_pause();
  };

  pause.textContent = "pause";
}

function on_pause() {
  console.log("pause");

  if (timer.is_paused) {
    set_status(STATUS.PAUSED);
    console.log("inside");

    pause.onclick = function () {
      return timer.resume();
    };

    pause.textContent = "resume";
  }
}

function on_resume() {
  set_status(STATUS.RUNNING);

  pause.onclick = function () {
    return on_pause();
  };

  pause.textContent = "pause";
}

function on_update() {
  display.textContent = timer.get_time();
}

},{"basic_timers":2}],2:[function(require,module,exports){
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var i=e();for(var n in i)("object"==typeof exports?exports:t)[n]=i[n]}}(window,(function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i.d(e,"Timer",(function(){return s})),i.d(e,"FixedTimer",(function(){return r})),i.d(e,"IntervalTimer",(function(){return a}));Date.now;function n(t){return"function"==typeof t}class s{constructor({on_start:t=null,on_end:e=null,on_update:i=null,on_resume:n=null,on_pause:s=null,update_interval_rate:r=10}={}){this.start_time=null,this.on_start=t,this.on_end=e,this.on_update=i,this.on_resume=n,this.on_pause=s,this.update_interval_rate=r,this.interval=null,this.paused_time=null,this.elapsed_time=0}get is_running(){return this.start_time&&!this.paused_time}get is_not_running(){return!(this.start_time&&!this.paused_time)}get is_paused(){return this.start_time&&this.paused_time}get is_not_paused(){return!(this.start_time&&this.paused_time)}start(t=Date.now()){if(this.start_time)return null;this.start_time=t,this.on_start&&n(this.on_start)&&this.on_start(),this.set_interval()}update(){return this.on_update&&n(this.on_update)&&this.on_update(),this.elapsed_time=this.get_elapsed_time(),this.elapsed_time}resume(){if(this.is_not_paused)return null;this.on_resume&&n(this.on_resume)&&this.on_resume();const t=Date.now()-(this.paused_time-this.start_time);this.start_time=t,this.paused_time=null,this.set_interval()}pause(){if(this.is_not_running)return null;this.paused_time=Date.now(),this.on_pause&&n(this.on_pause)&&this.on_pause(),this.clear_interval()}stop(){if(!this.start_time)return null;const t=this.get_elapsed_time();return this.elapsed_time=t,this.on_end&&n(this.on_end)&&this.on_end(),this.start_time=null,this.paused_time=null,this.clear_interval(),t}get_elapsed_time(){return this.start_time?Date.now()-this.start_time:null}get_time(){return this.elapsed_time}set_interval(){this.interval=setInterval(()=>{this.update()},this.update_interval_rate)}clear_interval(){clearInterval(this.interval)}}class r extends s{constructor(t){if(super(t),!t||!t.duration)throw new Error("FixedTimer requires a duration");this.duration=t.duration}update(){return this.elapsed_time=this.get_elapsed_time(),this.elapsed_time>=this.duration?this.stop():this.on_update&&n(this.on_update)&&this.on_update(),this.elapsed_time}}class a extends s{constructor(t={}){super(t),this.on_complete_interval=t.on_complete_interval||null,this._completed_intervals=[],this.last_completed_elapsed_time=0}get completed_intervals(){return this._completed_intervals}set completed_intervals(t){this._completed_intervals.push(t)}get_completed_interval(){return this.elapsed_time-this.last_completed_elapsed_time}update_completed_intervals(){this.completed_intervals=this.get_completed_interval()}update_last_completed_elapsed_time(){this.last_completed_elapsed_time=this.elapsed_time}invoke_on_complete_interval(){this.on_complete_interval&&n(this.on_complete_interval)&&this.on_complete_interval()}can_complete_interval(){return!(!this.elapsed_time||!this.is_running)}complete_interval(){if(!this.can_complete_interval())return null;this.update_completed_intervals(),this.update_last_completed_elapsed_time(),this.invoke_on_complete_interval()}get_all_completed_intervals(){return this.completed_intervals}}}])}));
},{}]},{},[1]);
