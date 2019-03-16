(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{321:function(e,n,o){"use strict";o.r(n),n.default='<p>A resolver is a library which helps in locating a module by its absolute path.\nA module can be required as a dependency from another module as:</p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> foo <span class="token keyword">from</span> <span class="token string">\'path/to/module\'</span><span class="token punctuation">;</span>\n<span class="token comment">// or</span>\n<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path/to/module\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>The dependency module can be from the application code or a third party library. The resolver helps\nwebpack find the module code that needs to be included in the bundle for every such <code>require</code>/<code>import</code> statement.\nwebpack uses <a href="https://github.com/webpack/enhanced-resolve">enhanced-resolve</a> to resolve file paths while bundling modules.</p>\n<h2 id="resolving-rules-in-webpack">Resolving rules in webpack<a href="#resolving-rules-in-webpack" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Using <code>enhanced-resolve</code>, webpack can resolve three kinds of file paths:</p>\n<h3 id="absolute-paths">Absolute paths<a href="#absolute-paths" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> <span class="token string">\'/home/me/file\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token string">\'C:\\\\Users\\\\me\\\\file\'</span><span class="token punctuation">;</span></code></pre>\n<p>Since we already have the absolute path to the file, no further resolution is required.</p>\n<h3 id="relative-paths">Relative paths<a href="#relative-paths" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> <span class="token string">\'../src/file1\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">\'./file2\'</span><span class="token punctuation">;</span></code></pre>\n<p>In this case, the directory of the resource file where the <code>import</code> or <code>require</code> occurs is taken to be the context directory. The relative path specified in the <code>import/require</code> is joined to this context path to produce the absolute path to the module.</p>\n<h3 id="module-paths">Module paths<a href="#module-paths" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> <span class="token string">\'module\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">\'module/lib/file\'</span><span class="token punctuation">;</span></code></pre>\n<p>Modules are searched for inside all directories specified in <a href="/configuration/resolve/#resolve-modules"><code>resolve.modules</code></a>.\nYou can replace the original module path by an alternate path by creating an alias for it using <a href="/configuration/resolve/#resolve-alias"><code>resolve.alias</code></a> configuration option.</p>\n<p>Once the path is resolved based on the above rule, the resolver checks to see if the path points to a file or a directory. If the path points to a file:</p>\n<ul>\n<li>If the path has a file extension, then the file is bundled straightaway.</li>\n<li>Otherwise, the file extension is resolved using the <a href="/configuration/resolve/#resolve-extensions"><code>resolve.extensions</code></a> option, which tells the resolver which extensions (eg - <code>.js</code>, <code>.jsx</code>) are acceptable for resolution.</li>\n</ul>\n<p>If the path points to a folder, then the following steps are taken to find the right file with the right extension:</p>\n<ul>\n<li>If the folder contains a <code>package.json</code> file, then fields specified in <a href="/configuration/resolve/#resolve-mainfields"><code>resolve.mainFields</code></a> configuration option are looked up in order, and the first such field in <code>package.json</code> determines the file path.</li>\n<li>If there is no <code>package.json</code> or if the main fields do not return a valid path, file names specified in the <a href="/configuration/resolve/#resolve-mainfiles"><code>resolve.mainFiles</code></a> configuration option are looked for in order, to see if a matching filename exists in the imported/required directory .</li>\n<li>The file extension is then resolved in a similar way using the <code>resolve.extensions</code> option.</li>\n</ul>\n<p>webpack provides reasonable <a href="/configuration/resolve">defaults</a> for these options depending on your build target.</p>\n<h2 id="resolving-loaders">Resolving Loaders<a href="#resolving-loaders" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>This follows the same rules as those specified for file resolution. But the <a href="/configuration/resolve/#resolveloader"><code>resolveLoader</code></a> configuration option can be used to have separate resolution rules for loaders.</p>\n<h2 id="caching">Caching<a href="#caching" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Every filesystem access is cached, so that multiple parallel or serial requests to the same file occur faster. In <a href="/configuration/watch/#watch">watch mode</a>, only modified files are evicted from the cache. If watch mode is off, then the cache gets purged before every compilation.</p>\n<p>See <a href="/configuration/resolve">Resolve API</a> to learn more on the configuration options mentioned above.</p>\n'}}]);