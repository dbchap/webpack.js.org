(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{308:function(n,s,a){"use strict";a.r(s),s.default='<p>Plugins are a key piece of the webpack ecosystem and provide the community with\na powerful way to tap into webpack\'s compilation process. A plugin is able to\n<a href="/api/compiler-hooks/#hooks">hook</a> into key events that are fired throughout each compilation. Every step\nof the way, the plugin will have full access to the <code>compiler</code> and, when\napplicable, the current <code>compilation</code>.</p>\n<blockquote class="tip">\n<p>For a high-level introduction to writing plugins, start with\n<a href="/contribute/writing-a-plugin">writing a plugin</a>.</p>\n</blockquote>\n<p>Let\'s start by going over <code>tapable</code> utility, which provides the backbone of\nwebpack\'s plugin interface.</p>\n<h2 id="tapable">Tapable<a href="#tapable" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>This small library is a core utility in webpack but can also be used elsewhere\nto provide a similar plugin interface. Many objects in webpack extend the\n<code>Tapable</code> class. The class exposes <code>tap</code>, <code>tapAsync</code>, and <code>tapPromise</code> methods\nwhich plugins can use to inject custom build steps that will be fired\nthroughout a compilation.</p>\n<p>Please see the <a href="https://github.com/webpack/tapable">documentation</a> to learn\nmore. An understanding of the three <code>tap</code> methods, as well as the hooks that\nprovide them is crucial. The objects that extend <code>Tapable</code> (e.g. the compiler),\nthe hooks they provide, and each hook\'s type (e.g. the <code>SyncHook</code>) will be\nnoted.</p>\n<h2 id="plugin-types">Plugin Types<a href="#plugin-types" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Depending on the hooks used and <code>tap</code> methods applied, plugins can function in\na different number of ways. The way this works is closely related to the\n<a href="https://github.com/webpack/tapable#tapable">hooks</a> provided by <code>Tapable</code>. The\n<a href="/api/compiler-hooks/#hooks">compiler hooks</a> each note the underlying <code>Tapable</code> hook indicating which\n<code>tap</code> methods are available.</p>\n<p>So depending which event you <code>tap</code> into, the plugin may run differently. For\nexample, when hooking into <code>compile</code> stage, only the synchronous <code>tap</code> method\ncan be used:</p>\n<pre><code class="hljs language-js">compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>compile<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">\'MyPlugin\'</span><span class="token punctuation">,</span> params <span class="token operator">=></span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Synchronously tapping the compile hook.\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>However, for <code>run</code> which utilizes the <code>AsyncHook</code>, we can utilize <code>tapAsync</code>\nor <code>tapPromise</code> (as well as <code>tap</code>):</p>\n<pre><code class="hljs language-js">compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>run<span class="token punctuation">.</span><span class="token function">tapAsync</span><span class="token punctuation">(</span><span class="token string">\'MyPlugin\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>source<span class="token punctuation">,</span> target<span class="token punctuation">,</span> routesList<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Asynchronously tapping the run hook.\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncompiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>run<span class="token punctuation">.</span><span class="token function">tapPromise</span><span class="token punctuation">(</span><span class="token string">\'MyPlugin\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>source<span class="token punctuation">,</span> target<span class="token punctuation">,</span> routesList<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>resolve <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Asynchronously tapping the run hook with a delay.\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncompiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>run<span class="token punctuation">.</span><span class="token function">tapPromise</span><span class="token punctuation">(</span><span class="token string">\'MyPlugin\'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>source<span class="token punctuation">,</span> target<span class="token punctuation">,</span> routesList<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>resolve <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Asynchronously tapping the run hook with a delay.\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>The moral of the story is that there are a variety of ways to <code>hook</code> into the\n<code>compiler</code>, each one allowing your plugin to run as it sees fit.</p>\n<h2 id="custom-hooks">Custom Hooks<a href="#custom-hooks" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>In order to add a new hook to the compilation for other plugins to <code>tap</code> into,\nsimply <code>require</code> the necessary hook class from <code>tapable</code> and create one:</p>\n<pre><code class="hljs language-js"><span class="token keyword">const</span> SyncHook <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'tapable\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>SyncHook<span class="token punctuation">;</span>\n\n<span class="token comment">// Within the `apply` method...</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>myCustomHook<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'Already in use\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncompiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>myCustomHook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SyncHook</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Wherever/whenever you\'d like to trigger the hook...</span>\ncompiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>myCustomHook<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>Again, see the <a href="https://github.com/webpack/tapable">documentation</a> for <code>tapable</code> to learn more about the\ndifferent hook classes and how they work.</p>\n<h2 id="reporting-progress">Reporting Progress<a href="#reporting-progress" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Plugins can report progress via <a href="/plugins/progress-plugin/"><code>ProgressPlugin</code></a>, which prints progress messages to stderr by default. In order to enable progress reporting, pass a <code>--progress</code> argument when running the <a href="/api/cli/">webpack CLI</a>.</p>\n<p>It is possible to customize the printed output by passing different arguments to the <code>reportProgress</code> function of <a href="/plugins/progress-plugin/"><code>ProgressPlugin</code></a>.</p>\n<p>To report progress, a plugin must <code>tap</code> into a hook using the <code>context: true</code> option:</p>\n<pre><code class="hljs language-js">compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tapAsync</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'MyPlugin\'</span><span class="token punctuation">,</span>\n  context<span class="token punctuation">:</span> <span class="token boolean">true</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>context<span class="token punctuation">,</span> compiler<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> reportProgress <span class="token operator">=</span> context <span class="token operator">&#x26;&#x26;</span> context<span class="token punctuation">.</span>reportProgress<span class="token punctuation">;</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>reportProgress<span class="token punctuation">)</span> <span class="token function">reportProgress</span><span class="token punctuation">(</span><span class="token number">0.95</span><span class="token punctuation">,</span> <span class="token string">\'Starting work\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>reportProgress<span class="token punctuation">)</span> <span class="token function">reportProgress</span><span class="token punctuation">(</span><span class="token number">0.95</span><span class="token punctuation">,</span> <span class="token string">\'Done work\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>The <code>reportProgress</code> function may be called with these arguments:</p>\n<pre><code class="hljs language-js"><span class="token function">reportProgress</span><span class="token punctuation">(</span>percentage<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<ul>\n<li><code>percentage</code>: This argument is unused; instead, <a href="/plugins/progress-plugin/"><code>ProgressPlugin</code></a> will calculate a percentage based on the current hook.</li>\n<li><code>...args</code>: Any number of strings, which will be passed to the <code>ProgressPlugin</code> handler to be reported to the user.</li>\n</ul>\n<p>Note that only a subset of compiler and compilation hooks support the <code>reportProgress</code> function. See <a href="/plugins/progress-plugin/#supported-hooks"><code>ProgressPlugin</code></a> for a full list.</p>\n<h2 id="next-steps">Next Steps<a href="#next-steps" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>See the <a href="/api/compiler-hooks/">compiler hooks</a> section for a detailed listing of all the available\n<code>compiler</code> hooks and the parameters they make available.</p>\n'}}]);