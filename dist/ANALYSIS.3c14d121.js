// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"n0fw4":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "5e0263af3c14d121";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"kTBnD":[function(require,module,exports,__globalThis) {
// Fix Chart.js import - use script tag in HTML instead
// import Chart from 'chart.js/auto';
// The above import was causing issues since you're not using a bundler
// DOM Elements
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const analyzerTabs = document.querySelectorAll('.analyzer-tab');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const completionRateEl = document.getElementById('completionRate');
const dailyChart = document.getElementById('dailyChart');
const weeklyChart = document.getElementById('weeklyChart');
const monthlyChart = document.getElementById('monthlyChart');
const dailyPieChart = document.getElementById('dailyPieChart');
const weeklyPieChart = document.getElementById('weeklyPieChart');
const priorityPieChart = document.getElementById('priorityPieChart');
const todayProgress = document.getElementById('todayProgress');
const todayStats = document.getElementById('todayStats');
const mostProductiveDay = document.getElementById('mostProductiveDay');
const weeklyGoalProgress = document.getElementById('weeklyGoalProgress');
const prevWeekBtn = document.getElementById('prevWeek');
const nextWeekBtn = document.getElementById('nextWeek');
const weekRange = document.getElementById('weekRange');
const monthDisplay = document.getElementById('monthDisplay');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const monthlyCompleted = document.getElementById('monthlyCompleted');
const productiveWeek = document.getElementById('productiveWeek');
const priorityFocus = document.getElementById('priorityFocus');
const allTaskCount = document.getElementById('allTaskCount');
const activeTaskCount = document.getElementById('activeTaskCount');
const completedTaskCount = document.getElementById('completedTaskCount');
const todayTaskCount = document.getElementById('todayTaskCount');
const todayCompletedCount = document.getElementById('todayCompletedCount');
const todayActiveCount = document.getElementById('todayActiveCount');
// Chart references
let chartInstances = {
    dailyChart: null,
    weeklyChart: null,
    monthlyChart: null,
    dailyPieChart: null,
    weeklyPieChart: null,
    monthlyPieChart: null
};
// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentView = 'daily';
let currentWeek = new Date();
let currentMonthDate = new Date();
let currentMonth = new Date();
let selectedDay = null;
// Initialize the application
function init() {
    // Set today's date as default for new tasks
    const today = new Date().toISOString().split('T')[0];
    if (taskDate) taskDate.value = today;
    // Setup event listeners for task management
    if (addTaskBtn) addTaskBtn.addEventListener('click', handleAddTask);
    if (taskInput) taskInput.addEventListener('keypress', (e)=>{
        if (e.key === 'Enter') handleAddTask();
    });
    // Setup filter buttons
    if (filterBtns && filterBtns.length > 0) filterBtns.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            const filter = btn.getAttribute('data-filter');
            if (filter) filterTasks(filter);
        });
    });
    // Setup view buttons
    if (viewBtns && viewBtns.length > 0) viewBtns.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            const view = btn.getAttribute('data-view');
            if (view) switchView(view);
        });
    });
    // Setup analyzer tabs
    if (analyzerTabs && analyzerTabs.length > 0) analyzerTabs.forEach((tab)=>{
        tab.addEventListener('click', ()=>{
            const tabView = tab.getAttribute('data-tab');
            if (tabView) switchAnalyzerTab(tabView);
        });
    });
    // Setup week navigation
    if (prevWeekBtn) prevWeekBtn.addEventListener('click', goToPrevWeek);
    if (nextWeekBtn) nextWeekBtn.addEventListener('click', goToNextWeek);
    // Setup month navigation
    if (prevMonthBtn) prevMonthBtn.addEventListener('click', goToPrevMonth);
    if (nextMonthBtn) nextMonthBtn.addEventListener('click', goToNextMonth);
    // Load tasks from local storage
    loadTasks();
    // Load saved view preference
    const savedView = localStorage.getItem('currentView');
    if (savedView) currentView = savedView;
    // Initialize view
    switchView(currentView);
    // Update stats and charts
    updateStats();
    updateWeekDisplay();
    initializeCharts();
    // Log initialization status to help with debugging
    console.log('App initialized. Current view:', currentView);
}
// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats();
    updateCharts();
    renderTasks();
}
// Update createTaskElement to make it more robust
function createTaskElement(task) {
    if (!task) return null;
    try {
        // Function to get priority class
        const getPriorityClass = (priority)=>{
            switch(priority){
                case 'urgent-important':
                    return 'priority-urgent-important';
                case 'not-urgent-important':
                    return 'priority-not-urgent-important';
                case 'urgent-not-important':
                    return 'priority-urgent-not-important';
                case 'not-urgent-not-important':
                    return 'priority-not-urgent-not-important';
                default:
                    return '';
            }
        };
        // Function to get priority label
        const getPriorityLabel = (priority)=>{
            switch(priority){
                case 'urgent-important':
                    return 'Urgent & Important';
                case 'not-urgent-important':
                    return 'Not Urgent but Important';
                case 'urgent-not-important':
                    return 'Urgent but Not Important';
                case 'not-urgent-not-important':
                    return 'Not Urgent & Not Important';
                default:
                    return '';
            }
        };
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''} ${getPriorityClass(task.priority)}`;
        li.dataset.id = task.id;
        const taskDate = formatDate(task.date);
        li.innerHTML = `
      <div class="task-content">
        <label class="checkbox-container">
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        <div class="task-info">
          <p class="task-text">${task.text}</p>
          <div class="task-meta">
            <span class="task-date"><i class="far fa-calendar"></i> ${taskDate}</span>
            <span class="task-priority">${getPriorityLabel(task.priority)}</span>
          </div>
        </div>
      </div>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;
        // Add event listeners to the task item
        const checkbox = li.querySelector('input[type="checkbox"]');
        if (checkbox) checkbox.addEventListener('change', ()=>{
            toggleTask(task.id);
        });
        const deleteBtn = li.querySelector('.delete-btn');
        if (deleteBtn) deleteBtn.addEventListener('click', ()=>{
            deleteTask(task.id);
        });
        return li;
    } catch (error) {
        console.error('Error creating task element:', error, task);
        return null;
    }
}
// Format date for display
function formatDate(dateString) {
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
// Add a new task
function handleAddTask() {
    const text = taskInput.value.trim();
    const date = taskDate.value;
    const priority = taskPriority.value;
    if (text && date && priority !== 'none') {
        addTask(text, date, priority);
        taskInput.value = '';
        taskPriority.value = 'none';
    // Keep the date as is for convenience when adding multiple tasks
    }
}
function addTask(text, date, priority) {
    const newTask = {
        id: Date.now(),
        text,
        date,
        priority,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    updateStats();
    updateCharts();
}
// Toggle task completion status
function toggleTask(id) {
    tasks = tasks.map((task)=>task.id === id ? {
            ...task,
            completed: !task.completed
        } : task);
    saveTasks();
    renderTasks();
    updateStats();
    updateCharts();
}
// Delete a task
function deleteTask(id) {
    tasks = tasks.filter((task)=>task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
    updateCharts();
}
// Filter tasks by status
function filterTasks(filter) {
    currentFilter = filter;
    filterBtns.forEach((btn)=>{
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });
    renderTasks();
}
// Update the switchView function
function switchView(view) {
    // Update current view
    currentView = view;
    // Update view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach((btn)=>{
        btn.classList.toggle('active', btn.getAttribute('data-view') === view);
    });
    // Update view displays
    const taskViews = document.querySelectorAll('.task-view');
    taskViews.forEach((v)=>{
        v.classList.toggle('active', v.id === `${view}View`);
    });
    // Special handling for views that need refreshing
    if (view === 'weekly') renderWeekView();
    else if (view === 'matrix') renderMatrixView();
    else if (view === 'monthly') renderCalendar();
    else if (view === 'daily') renderDailyView();
    // Save current view preference
    localStorage.setItem('currentView', view);
}
// Switch between analyzer tabs
function switchAnalyzerTab(tab) {
    analyzerTabs.forEach((btn)=>{
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
    document.querySelectorAll('.analysis-view').forEach((view)=>{
        view.classList.remove('active');
    });
    document.getElementById(`${tab}Analysis`).classList.add('active');
}
// Get week dates (Sunday to Saturday)
function getWeekDates(date) {
    const day = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const diff = date.getDate() - day;
    const sunday = new Date(date);
    sunday.setDate(diff);
    const weekDates = [];
    for(let i = 0; i < 7; i++){
        const nextDate = new Date(sunday);
        nextDate.setDate(sunday.getDate() + i);
        weekDates.push(nextDate);
    }
    return weekDates;
}
// Navigate to previous week
function goToPrevWeek() {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    currentWeek = prevWeek;
    updateWeekDisplay();
    renderWeekView();
}
// Navigate to next week
function goToNextWeek() {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    currentWeek = nextWeek;
    updateWeekDisplay();
    renderWeekView();
}
// Update week display
function updateWeekDisplay() {
    const weekDates = getWeekDates(currentWeek);
    const startDate = weekDates[0].toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    const endDate = weekDates[6].toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    weekRange.textContent = `Week of ${startDate} - ${endDate}`;
}
// Format date to YYYY-MM-DD for comparison
function formatDateForComparison(date) {
    return date.toISOString().split('T')[0];
}
// Render tasks based on current view and filter
function renderTasks() {
    if (currentView === 'daily') renderDailyView();
    else if (currentView === 'weekly') renderWeekView();
    else if (currentView === 'matrix') renderMatrixView();
    else if (currentView === 'monthly') renderCalendar();
}
// Render daily view
function renderDailyView() {
    // Get today's date in YYYY-MM-DD format for comparison
    const today = new Date().toISOString().split('T')[0];
    // Filter tasks based on the currentFilter
    const filteredTasks = tasks.filter((task)=>{
        if (currentFilter === 'all') return true;
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });
    // Count today's tasks
    const todayTasksList = tasks.filter((task)=>task.date === today);
    const todayCompletedList = todayTasksList.filter((task)=>task.completed);
    const todayActiveList = todayTasksList.filter((task)=>!task.completed);
    // Update task counts if elements exist
    if (todayTaskCount) todayTaskCount.textContent = todayTasksList.length;
    if (todayCompletedCount) todayCompletedCount.textContent = todayCompletedList.length;
    if (todayActiveCount) todayActiveCount.textContent = todayActiveList.length;
    if (allTaskCount) allTaskCount.textContent = tasks.length;
    if (activeTaskCount) activeTaskCount.textContent = tasks.filter((task)=>!task.completed).length;
    if (completedTaskCount) completedTaskCount.textContent = tasks.filter((task)=>task.completed).length;
    // Update task list if element exists
    if (taskList) {
        // Clear the task list
        taskList.innerHTML = '';
        // Add filtered tasks to the list
        filteredTasks.forEach((task)=>{
            const taskElement = createTaskElement(task);
            if (taskElement) taskList.appendChild(taskElement);
        });
    }
    // Update today's progress indicators
    updateTodayProgressIndicators(todayTasksList, todayCompletedList);
}
// Add the updateTodayProgressIndicators function
function updateTodayProgressIndicators(todayTasks, completedTasks) {
    // Update today's progress bar if it exists
    const progressBar = document.getElementById('todayProgress');
    const statsText = document.getElementById('todayStats');
    if (progressBar || statsText) {
        const todayTasksCount = todayTasks.length;
        const completedCount = completedTasks.length;
        const progressPercentage = todayTasksCount > 0 ? completedCount / todayTasksCount * 100 : 0;
        if (progressBar) progressBar.style.width = `${progressPercentage}%`;
        if (statsText) statsText.textContent = `${completedCount}/${todayTasksCount} tasks completed`;
    }
}
// Render weekly view
function renderWeekView() {
    // Get dates for the current week
    const weekDates = getWeekDates(currentWeek);
    // Clear all day columns
    document.querySelectorAll('.day-column .day-tasks').forEach((column)=>{
        column.innerHTML = '';
    });
    // Add tasks to the appropriate day columns
    weekDates.forEach((date, index)=>{
        const formattedDate = formatDateForComparison(date);
        const dayTasks = tasks.filter((task)=>task.date === formattedDate);
        const dayColumn = document.querySelector(`.day-column[data-day="${index}"] .day-tasks`);
        dayTasks.forEach((task)=>{
            dayColumn.appendChild(createTaskElement(task));
        });
    });
}
// Render matrix view
function renderMatrixView() {
    // Clear all quadrants
    document.querySelectorAll('.matrix-quadrant .matrix-tasks').forEach((quadrant)=>{
        quadrant.innerHTML = '';
    });
    // Filter tasks by priority and add to appropriate quadrants
    const quadrant1Tasks = tasks.filter((task)=>task.priority === 'urgent-important');
    const quadrant2Tasks = tasks.filter((task)=>task.priority === 'not-urgent-important');
    const quadrant3Tasks = tasks.filter((task)=>task.priority === 'urgent-not-important');
    const quadrant4Tasks = tasks.filter((task)=>task.priority === 'not-urgent-not-important');
    const quadrant1 = document.querySelector('#quadrant1 .matrix-tasks');
    const quadrant2 = document.querySelector('#quadrant2 .matrix-tasks');
    const quadrant3 = document.querySelector('#quadrant3 .matrix-tasks');
    const quadrant4 = document.querySelector('#quadrant4 .matrix-tasks');
    quadrant1Tasks.forEach((task)=>{
        quadrant1.appendChild(createTaskElement(task));
    });
    quadrant2Tasks.forEach((task)=>{
        quadrant2.appendChild(createTaskElement(task));
    });
    quadrant3Tasks.forEach((task)=>{
        quadrant3.appendChild(createTaskElement(task));
    });
    quadrant4Tasks.forEach((task)=>{
        quadrant4.appendChild(createTaskElement(task));
    });
}
// Update stats
function updateStats() {
    // Calculate total stats
    const totalTasksCount = tasks.length;
    const completedTasksCount = tasks.filter((task)=>task.completed).length;
    const completionRate = totalTasksCount > 0 ? Math.round(completedTasksCount / totalTasksCount * 100) : 0;
    // Update total stats display
    totalTasksEl.textContent = totalTasksCount;
    completedTasksEl.textContent = completedTasksCount;
    completionRateEl.textContent = `${completionRate}%`;
    // Update today's stats
    const today = new Date().toISOString().split('T')[0];
    const todayTasksList = tasks.filter((task)=>task.date === today);
    const todayCompletedCount = todayTasksList.filter((task)=>task.completed).length;
    const todayTasksCount = todayTasksList.length;
    const todayProgressPercentage = todayTasksCount > 0 ? todayCompletedCount / todayTasksCount * 100 : 0;
    todayProgress.style.width = `${todayProgressPercentage}%`;
    todayStats.textContent = `${todayCompletedCount}/${todayTasksCount} tasks completed`;
    // Find most productive day
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    const dayTaskCounts = Array(7).fill(0);
    tasks.forEach((task)=>{
        if (task.completed) {
            const taskDate = new Date(task.date);
            const dayOfWeek = taskDate.getDay();
            dayTaskCounts[dayOfWeek]++;
        }
    });
    const maxTaskCount = Math.max(...dayTaskCounts);
    if (maxTaskCount > 0) {
        const mostProductiveIndex = dayTaskCounts.indexOf(maxTaskCount);
        mostProductiveDay.textContent = dayNames[mostProductiveIndex];
    } else mostProductiveDay.textContent = '-';
    // Update weekly goal progress
    weeklyGoalProgress.textContent = `${completionRate}%`;
}
// Initialize charts
function initializeCharts() {
    // Helper function to create or update a chart
    const createOrUpdateChart = (canvasId, chartType, chartKey, data, options)=>{
        try {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;
            // Destroy existing chart instance if it exists
            if (chartInstances[chartKey]) chartInstances[chartKey].destroy();
            // Create new chart
            const ctx = canvas.getContext('2d');
            if (ctx) chartInstances[chartKey] = new Chart(ctx, {
                type: chartType,
                data: data,
                options: options || {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        } catch (error) {
            console.error(`Error creating ${chartKey}:`, error);
        }
    };
    // Update charts with current data
    updateCharts();
}
// Update all charts
function updateCharts() {
    try {
        // Helper function to get dates for the last 7 days
        const getLast7Days = ()=>{
            const dates = [];
            for(let i = 6; i >= 0; i--){
                const date = new Date();
                date.setDate(date.getDate() - i);
                dates.push(date.toISOString().split('T')[0]);
            }
            return dates;
        };
        // Helper function to get last 6 months
        const getLast6Months = ()=>{
            const months = [];
            const monthNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
            for(let i = 5; i >= 0; i--){
                const date = new Date();
                date.setDate(1); // First day of month
                date.setMonth(date.getMonth() - i);
                months.push({
                    date: new Date(date),
                    label: `${monthNames[date.getMonth()]} ${date.getFullYear()}`
                });
            }
            return months;
        };
        const dates = getLast7Days();
        const completedCounts = dates.map((date)=>tasks.filter((task)=>task.date === date && task.completed).length);
        // Daily Chart Data
        const dailyChartData = {
            labels: dates.map((date)=>new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short'
                })),
            datasets: [
                {
                    label: 'Tasks Completed',
                    data: completedCounts,
                    backgroundColor: '#3498db'
                }
            ]
        };
        // Weekly Chart Data
        const weeks = [];
        for(let i = 3; i >= 0; i--){
            const date = new Date();
            date.setDate(date.getDate() - i * 7);
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            weeks.push(weekStart);
        }
        const weeklyData = weeks.map((weekStart)=>{
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            return tasks.filter((task)=>{
                const taskDate = new Date(task.date);
                return taskDate >= weekStart && taskDate <= weekEnd && task.completed;
            }).length;
        });
        const weeklyChartData = {
            labels: weeks.map((date)=>{
                const endDate = new Date(date);
                endDate.setDate(date.getDate() + 6);
                return `${date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                })} - ${endDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                })}`;
            }),
            datasets: [
                {
                    label: 'Tasks Completed',
                    data: weeklyData,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    tension: 0.1,
                    fill: true
                }
            ]
        };
        // Monthly Chart Data
        const months = getLast6Months();
        const monthlyData = months.map((month)=>{
            const nextMonth = new Date(month.date);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            return tasks.filter((task)=>{
                const taskDate = new Date(task.date);
                return taskDate >= month.date && taskDate < nextMonth && task.completed;
            }).length;
        });
        const monthlyChartData = {
            labels: months.map((month)=>month.label),
            datasets: [
                {
                    label: 'Tasks Completed',
                    data: monthlyData,
                    backgroundColor: '#3498db'
                }
            ]
        };
        // Today's tasks for daily stats
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = tasks.filter((task)=>task.date === today);
        const todayCompleted = todayTasks.filter((task)=>task.completed).length;
        // Daily Pie Chart Data
        const dailyPieData = {
            labels: [
                'Completed',
                'Active'
            ],
            datasets: [
                {
                    data: [
                        todayCompleted,
                        Math.max(0, todayTasks.length - todayCompleted)
                    ],
                    backgroundColor: [
                        '#27ae60',
                        '#e74c3c'
                    ]
                }
            ]
        };
        // Weekly Pie Chart Data
        const dayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        const dayTaskCounts = Array(7).fill(0);
        tasks.forEach((task)=>{
            if (task.completed) {
                const taskDate = new Date(task.date);
                const dayOfWeek = taskDate.getDay();
                dayTaskCounts[dayOfWeek]++;
            }
        });
        const weeklyPieData = {
            labels: dayNames,
            datasets: [
                {
                    data: dayTaskCounts,
                    backgroundColor: [
                        '#1abc9c',
                        '#2ecc71',
                        '#3498db',
                        '#9b59b6',
                        '#e74c3c',
                        '#f1c40f',
                        '#e67e22'
                    ]
                }
            ]
        };
        // Monthly Pie Chart Data - By Priority
        const priorityCounts = {
            'urgent-important': 0,
            'not-urgent-important': 0,
            'urgent-not-important': 0,
            'not-urgent-not-important': 0
        };
        tasks.forEach((task)=>{
            if (task.priority && priorityCounts.hasOwnProperty(task.priority)) priorityCounts[task.priority]++;
        });
        const monthlyPieData = {
            labels: [
                'Urgent & Important',
                'Not Urgent but Important',
                'Urgent but Not Important',
                'Not Urgent & Not Important'
            ],
            datasets: [
                {
                    data: [
                        priorityCounts['urgent-important'],
                        priorityCounts['not-urgent-important'],
                        priorityCounts['urgent-not-important'],
                        priorityCounts['not-urgent-not-important']
                    ],
                    backgroundColor: [
                        '#e74c3c',
                        '#3498db',
                        '#f1c40f',
                        '#1abc9c'
                    ]
                }
            ]
        };
        // Update most productive week and priority focus
        updateMonthlyStats();
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        };
        const pieChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            let total = context.dataset.data.reduce((a, b)=>a + b, 0);
                            let percentage = total > 0 ? Math.round(value / total * 100) : 0;
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        };
        // Create/update all charts (only if the elements exist)
        if (document.getElementById('dailyChart')) updateChart('dailyChart', 'bar', 'dailyChart', dailyChartData, chartOptions);
        if (document.getElementById('weeklyChart')) updateChart('weeklyChart', 'line', 'weeklyChart', weeklyChartData, chartOptions);
        if (document.getElementById('monthlyChart')) updateChart('monthlyChart', 'bar', 'monthlyChart', monthlyChartData, chartOptions);
        if (document.getElementById('dailyPieChart')) updateChart('dailyPieChart', 'pie', 'dailyPieChart', dailyPieData, pieChartOptions);
        if (document.getElementById('weeklyPieChart')) updateChart('weeklyPieChart', 'pie', 'weeklyPieChart', weeklyPieData, pieChartOptions);
        if (document.getElementById('monthlyPieChart')) updateChart('monthlyPieChart', 'pie', 'monthlyPieChart', monthlyPieData, pieChartOptions);
    } catch (error) {
        console.error("Error updating charts:", error);
    }
}
// Update the updateChart function to safely handle Chart.js
function updateChart(canvasId, chartType, chartKey, data, options) {
    try {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        // Check if Chart is defined
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded');
            return;
        }
        // Destroy existing chart instance if it exists
        if (chartInstances[chartKey]) chartInstances[chartKey].destroy();
        // Create new chart
        const ctx = canvas.getContext('2d');
        if (ctx) chartInstances[chartKey] = new Chart(ctx, {
            type: chartType,
            data: data,
            options: options || {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    } catch (error) {
        console.error(`Error updating ${chartKey}:`, error);
    }
}
// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
// Remove the redundant initializeMonthlyView function as we now handle it in init
// and update renderCalendar to work directly
function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    if (!calendarDays) return; // Exit if element not found
    const monthDisplayEl = document.getElementById('monthDisplay');
    // Clear previous calendar
    calendarDays.innerHTML = '';
    // Set month display
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    monthDisplayEl.textContent = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    // Calculate first day of the month
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const firstDayIndex = firstDay.getDay(); // 0 for Sunday
    // Calculate last day of the month
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();
    // Calculate last day of previous month
    const prevLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    const prevLastDayDate = prevLastDay.getDate();
    // Calculate days to show from next month
    const nextDays = 7 - ((firstDayIndex + totalDays) % 7 || 7);
    // Render days from previous month
    for(let i = firstDayIndex; i > 0; i--){
        const dayEl = createCalendarDay(prevLastDayDate - i + 1, true);
        calendarDays.appendChild(dayEl);
    }
    // Render days of current month
    const today = new Date();
    for(let i = 1; i <= totalDays; i++){
        const isToday = i === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
        const dayEl = createCalendarDay(i, false, isToday);
        // Add tasks for this day
        const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i).toISOString().split('T')[0];
        addTasksToCalendarDay(dayEl, dayDate);
        calendarDays.appendChild(dayEl);
    }
    // Render days from next month
    for(let i = 1; i <= nextDays; i++){
        const dayEl = createCalendarDay(i, true);
        calendarDays.appendChild(dayEl);
    }
    // Update month summary
    updateMonthSummary();
}
function createCalendarDay(day, isOtherMonth, isToday = false) {
    const dayEl = document.createElement('div');
    dayEl.classList.add('calendar-day');
    if (isOtherMonth) dayEl.classList.add('other-month');
    if (isToday) dayEl.classList.add('today');
    const dateEl = document.createElement('div');
    dateEl.classList.add('calendar-date');
    dateEl.textContent = day;
    dayEl.appendChild(dateEl);
    const taskList = document.createElement('ul');
    taskList.classList.add('calendar-task-list');
    dayEl.appendChild(taskList);
    return dayEl;
}
function addTasksToCalendarDay(dayEl, dateStr) {
    const tasks = getTasks().filter((task)=>task.date === dateStr);
    const taskList = dayEl.querySelector('.calendar-task-list');
    if (tasks.length > 0) {
        // Add task count badge
        const countBadge = document.createElement('div');
        countBadge.classList.add('day-task-count');
        countBadge.textContent = tasks.length;
        dayEl.appendChild(countBadge);
        // Add tasks to the list (max 3)
        const maxToShow = Math.min(tasks.length, 3);
        for(let i = 0; i < maxToShow; i++){
            const taskItem = document.createElement('li');
            taskItem.classList.add('calendar-task-item');
            if (tasks[i].completed) taskItem.classList.add('completed');
            taskItem.textContent = truncateText(tasks[i].text, 15);
            taskItem.setAttribute('data-id', tasks[i].id);
            taskList.appendChild(taskItem);
        }
        // Add "more" indicator if needed
        if (tasks.length > 3) {
            const moreItem = document.createElement('li');
            moreItem.classList.add('calendar-task-item');
            moreItem.textContent = `+${tasks.length - 3} more`;
            taskList.appendChild(moreItem);
        }
    }
}
function updateMonthSummary() {
    // Get current month's start and end dates
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDateStr = startOfMonth.toISOString().split('T')[0];
    const endDateStr = endOfMonth.toISOString().split('T')[0];
    // Filter tasks for this month
    const tasks = getTasks().filter((task)=>{
        return task.date >= startDateStr && task.date <= endDateStr;
    });
    const completedTasks = tasks.filter((task)=>task.completed);
    // Update summary
    document.getElementById('monthTaskCount').textContent = tasks.length;
    document.getElementById('monthCompletedCount').textContent = completedTasks.length;
    document.getElementById('monthActiveCount').textContent = tasks.length - completedTasks.length;
}
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}
// Update the refresh function
function refreshView() {
    const storedView = localStorage.getItem('currentView');
    if (storedView) {
        currentView = storedView;
        switchView(currentView);
    } else {
        renderDailyView();
        updateDailySummary();
    }
}
// Add updateDailySummary function
function updateDailySummary() {
    // Get today's date in YYYY-MM-DD format for comparison
    const today = new Date().toISOString().split('T')[0];
    // Count today's tasks
    const todayTasksList = tasks.filter((task)=>task.date === today);
    const todayCompletedList = todayTasksList.filter((task)=>task.completed);
    const todayActiveList = todayTasksList.filter((task)=>!task.completed);
    // Update task counts
    todayTaskCount.textContent = todayTasksList.length;
    todayCompletedCount.textContent = todayCompletedList.length;
    todayActiveCount.textContent = todayActiveList.length;
}
// Add the missing getTasks function
function getTasks() {
    return tasks;
}
// Add month navigation functions
function goToPrevMonth() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
}
function goToNextMonth() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
}
// Add a loadTasks function to handle loading tasks from localStorage
function loadTasks() {
    try {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            console.log(`Loaded ${tasks.length} tasks from localStorage`);
        } else console.log('No saved tasks found');
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasks = [];
    }
}
// Add updateMonthlyStats function
function updateMonthlyStats() {
    try {
        // Find most productive week
        const weeksData = [];
        // Calculate for the last 4 weeks
        for(let i = 0; i < 4; i++){
            const endDate = new Date();
            endDate.setDate(endDate.getDate() - i * 7);
            const startDate = new Date(endDate);
            startDate.setDate(endDate.getDate() - 6);
            const startDateStr = startDate.toISOString().split('T')[0];
            const endDateStr = endDate.toISOString().split('T')[0];
            const weekTasks = tasks.filter((task)=>{
                const taskDate = task.date;
                return taskDate >= startDateStr && taskDate <= endDateStr && task.completed;
            });
            weeksData.push({
                week: i + 1,
                startDate: startDate,
                endDate: endDate,
                completedCount: weekTasks.length
            });
        }
        // Sort by number of completed tasks
        weeksData.sort((a, b)=>b.completedCount - a.completedCount);
        // Update most productive week
        const mostProductiveWeekEl = document.getElementById('mostProductiveWeek');
        if (mostProductiveWeekEl && weeksData.length > 0 && weeksData[0].completedCount > 0) {
            const week = weeksData[0];
            mostProductiveWeekEl.textContent = `Week ${week.week}: ${week.startDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })} - ${week.endDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })} (${week.completedCount} tasks)`;
        } else if (mostProductiveWeekEl) mostProductiveWeekEl.textContent = 'No completed tasks yet';
        // Find priority focus
        const priorityCounts = {
            'urgent-important': 0,
            'not-urgent-important': 0,
            'urgent-not-important': 0,
            'not-urgent-not-important': 0
        };
        tasks.forEach((task)=>{
            if (task.priority && priorityCounts.hasOwnProperty(task.priority)) priorityCounts[task.priority]++;
        });
        // Find highest priority
        let highestPriority = '';
        let highestCount = 0;
        for(const priority in priorityCounts)if (priorityCounts[priority] > highestCount) {
            highestCount = priorityCounts[priority];
            highestPriority = priority;
        }
        // Map priority to readable name
        const priorityNames = {
            'urgent-important': 'Urgent & Important',
            'not-urgent-important': 'Not Urgent but Important',
            'urgent-not-important': 'Urgent but Not Important',
            'not-urgent-not-important': 'Not Urgent & Not Important'
        };
        // Update priority focus
        const priorityFocusEl = document.getElementById('priorityFocus');
        if (priorityFocusEl && highestCount > 0) priorityFocusEl.textContent = priorityNames[highestPriority];
        else if (priorityFocusEl) priorityFocusEl.textContent = 'No tasks yet';
        // Update monthly goal progress
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((task)=>task.completed).length;
        const progressPercentage = totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0;
        const monthlyGoalProgressEl = document.getElementById('monthlyGoalProgress');
        if (monthlyGoalProgressEl) monthlyGoalProgressEl.textContent = `${progressPercentage}%`;
    } catch (error) {
        console.error('Error updating monthly stats:', error);
    }
}

},{}]},["n0fw4","kTBnD"], "kTBnD", "parcelRequiree61f", {})

//# sourceMappingURL=ANALYSIS.3c14d121.js.map
