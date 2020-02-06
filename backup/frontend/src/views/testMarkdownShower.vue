<template lang="html">
	<div>
		<!--
			<div v-html = 'article.html' v-highlight> </div>
			<div class= 'hljs' v-html = 'article.markdown'> </div>
		-->
		<div v-html = 'article.html' v-highlight> </div>
	</div>
</template>

<script>
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';

export default {
	name: 'testMarkdownShower',
	components: {
	},
	data() {
		return {
			article: {
				html: '<html class="theme theme-white">\n<head>\n<meta charset="utf-8">\n<title>decaf编译器报告</title>\n<link href="../assets/template-theme-white.css" rel="stylesheet" media="screen">\n<style type="text/css">\n\n#wmd-preview h1  {\n    color: #0077bb; /* 将标题改为蓝色 */\n}\n#wmd-preview .Consolas_font  {\n    font-family: Consolas;\n}</style>\n</head>\n<body class="theme theme-white">\n<div id="wmd-preview" class="wmd-preview wmd-preview-full-reader"><div class="md-section-divider"></div><div class="md-section-divider"></div><h1 data-anchor-id="wsde" id="decaf编译器报告">decaf编译器报告</h1><p data-anchor-id="pzcy"><code>操作系统</code></p><p data-anchor-id="2kk1">Author： 计62 徐晟 2016011253</p><hr><div class="md-section-divider"></div><h2 data-anchor-id="bfao" id="decaf编译器目标">decaf编译器目标</h2><ul data-anchor-id="pwzd">\n<li>完成一个decaf-mips32编译器</li>\n<li>编译decaf程序到MIPS32程序，并且在ucore上运行这个mips32程序</li>\n</ul><div class="md-section-divider"></div><h2 data-anchor-id="qkmp" id="decaf编译器完成过程">decaf编译器完成过程</h2><ul data-anchor-id="hfff">\n<li>因为decaf编译器是基于编译原理课的作业的，而我在编译原理课上已经完成到了decaf lab5，即通过简单的图染色来分配寄存器，然后通过三地址码生成mips程序，所以这个学期的需要新加的内容并不太多</li>\n<li>首先对<code>fib.decaf</code>进行编译得到<code>fib.S</code>，这个程序可以在SPIM上运行并输出</li>\n<li>但是<code>fib.S</code>因为缺少链接和ucore-thumips相关的系统调用，所以并不能在ucore上运行，我参考ucore的piggy的方法，调用了<code>kernel.ld</code>，并且替换了头文件，在ucore-thumips的<code>Makefile</code>文件中加入了转成二进制的<code>fib</code>文件，就能够成功运行了</li>\n</ul><div class="md-section-divider"></div><h3 data-anchor-id="zqqe" id="decaf程序运行结果">decaf程序运行结果</h3><p data-anchor-id="yby6"><code>fib.decaf</code>的源代码为</p><div class="md-section-divider"></div><pre class="prettyprint linenums prettyprinted" data-anchor-id="wu2l"><ol class="linenums"><li class="L0"><code class="language-decaf"><span class="kwd">class</span><span class="pln"> </span><span class="typ">Main</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L1"><code class="language-decaf"></code></li><li class="L2"><code class="language-decaf"><span class="pln">    </span><span class="com">// the main entry</span></code></li><li class="L3"><code class="language-decaf"><span class="pln">    </span><span class="kwd">static</span><span class="pln"> </span><span class="kwd">void</span><span class="pln"> main</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L4"><code class="language-decaf"><span class="pln">        </span><span class="kwd">int</span><span class="pln"> i</span><span class="pun">;</span></code></li><li class="L5"><code class="language-decaf"><span class="pln">        </span><span class="kwd">class</span><span class="pln"> </span><span class="typ">Fibonacci</span><span class="pln"> F</span><span class="pun">;</span></code></li><li class="L6"><code class="language-decaf"></code></li><li class="L7"><code class="language-decaf"><span class="pln">        F </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">new</span><span class="pln"> </span><span class="typ">Fibonacci</span><span class="pun">();</span><span class="pln">    </span><span class="com">// creates a new Fibonacci object</span></code></li><li class="L8"><code class="language-decaf"><span class="pln">        i </span><span class="pun">=</span><span class="pln"> </span><span class="lit">0</span><span class="pun">;</span><span class="pln">                  </span><span class="com">// for i from 0 to 9, prints F_i</span></code></li><li class="L9"><code class="language-decaf"><span class="pln">        </span><span class="kwd">while</span><span class="pln"> </span><span class="pun">(</span><span class="pln">i </span><span class="pun">&lt;</span><span class="pln"> </span><span class="lit">10</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L0"><code class="language-decaf"><span class="pln">            </span><span class="typ">Print</span><span class="pln"> </span><span class="pun">(</span><span class="pln">F</span><span class="pun">.</span><span class="kwd">get</span><span class="pun">(</span><span class="pln">i</span><span class="pun">),</span><span class="pln"> </span><span class="str">"\n"</span><span class="pun">);</span></code></li><li class="L1"><code class="language-decaf"><span class="pln">            i </span><span class="pun">=</span><span class="pln"> i </span><span class="pun">+</span><span class="pln"> </span><span class="lit">1</span><span class="pun">;</span></code></li><li class="L2"><code class="language-decaf"><span class="pln">        </span><span class="pun">}</span></code></li><li class="L3"><code class="language-decaf"><span class="pln">    </span><span class="pun">}</span></code></li><li class="L4"><code class="language-decaf"><span class="pun">}</span></code></li><li class="L5"><code class="language-decaf"></code></li><li class="L6"><code class="language-decaf"><span class="kwd">class</span><span class="pln"> </span><span class="typ">Fibonacci</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L7"><code class="language-decaf"></code></li><li class="L8"><code class="language-decaf"><span class="pln">    </span><span class="com">// gets F_i</span></code></li><li class="L9"><code class="language-decaf"><span class="pln">    </span><span class="kwd">int</span><span class="pln"> </span><span class="kwd">get</span><span class="pun">(</span><span class="kwd">int</span><span class="pln"> index</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L0"><code class="language-decaf"><span class="pln">        </span><span class="kwd">if</span><span class="pln"> </span><span class="pun">(</span><span class="pln">index </span><span class="pun">&lt;</span><span class="pln"> </span><span class="lit">2</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span></code></li><li class="L1"><code class="language-decaf"><span class="pln">            </span><span class="kwd">return</span><span class="pln"> </span><span class="lit">1</span><span class="pun">;</span></code></li><li class="L2"><code class="language-decaf"><span class="pln">        </span><span class="pun">}</span></code></li><li class="L3"><code class="language-decaf"><span class="pln">        </span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">get</span><span class="pun">(</span><span class="pln">index </span><span class="pun">-</span><span class="pln"> </span><span class="lit">1</span><span class="pun">)</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> </span><span class="kwd">get</span><span class="pun">(</span><span class="pln">index </span><span class="pun">-</span><span class="pln"> </span><span class="lit">2</span><span class="pun">);</span></code></li><li class="L4"><code class="language-decaf"><span class="pln">    </span><span class="pun">}</span></code></li><li class="L5"><code class="language-decaf"><span class="pun">}</span></code></li></ol></pre><p data-anchor-id="6scc"><code>fib</code>程序在ucore-thumips上运行的结果为</p><div class="md-section-divider"></div><pre class="prettyprint linenums prettyprinted" data-anchor-id="r5ua"><ol class="linenums"><li class="L0"><code><span class="lit">1</span></code></li><li class="L1"><code><span class="lit">1</span></code></li><li class="L2"><code><span class="lit">2</span></code></li><li class="L3"><code><span class="lit">3</span></code></li><li class="L4"><code><span class="lit">5</span></code></li><li class="L5"><code><span class="lit">8</span></code></li><li class="L6"><code><span class="lit">13</span></code></li><li class="L7"><code><span class="lit">21</span></code></li><li class="L8"><code><span class="lit">34</span></code></li><li class="L9"><code><span class="lit">55</span></code></li><li class="L0"><code><span class="lit">89</span></code></li><li class="L1"><code><span class="lit">144</span></code></li><li class="L2"><code><span class="lit">233</span></code></li><li class="L3"><code><span class="lit">377</span></code></li><li class="L4"><code><span class="lit">610</span></code></li><li class="L5"><code><span class="lit">987</span></code></li><li class="L6"><code><span class="lit">1597</span></code></li><li class="L7"><code><span class="lit">2584</span></code></li><li class="L8"><code><span class="lit">4181</span></code></li><li class="L9"><code><span class="lit">6765</span></code></li></ol></pre><p data-anchor-id="4adi">说明fib程序编译并且链接成功，可以运行</p></div>\n</body>\n</html>\n',
				markdown: '## 1. Enigma密码\n### 初始状态设置\n我们假设这是一个简单的`3-rotor 6-plugboard enigma machine`，使用http://practicalcryptography.com/ciphers/mechanical-era/enigma/ 上的js来模拟生成一段明文和密文如下：\n```\nPlaintext:\nTHEENIGMACIPHERWASAFIELDCIPHERUSEDBYTHEGERMANSDURINGWORLDWARIITHEENIGMAISONEOFTHEBETTERKNOWNHISTORICALENCRYPTIONMACHINESANDITACTUALLYREFERSTOARANGEOFSIMILARCIPHERMACHINES\nRing settings: AAD\nRotors: 312\nPlug board settings: HN IU JK LM OP TY\nCiphertext: VDCOQJQKHVKGWDZCHACAXYYQSMOWQMBILVIGUWXRNAWJWWQXNSIRDZWMYPONJSEMBZUFSPVZYTZGJQFJWIOPQXXULBOXNTYJQQYEUWPIELALKAZIGDPTEMGCZFXOQSWIOSRJZQHYOCYUZHGRZCSMUPAZWPTMGAYTLNYIYGVTLH\n```',
			}
		}
	},
	mounted(){
		marked.setOptions({
			renderer: new marked.Renderer(),
			highlight: function(code) {
				return hljs.highlightAuto(code).value;
			},
			pedantic: false,
			gfm: true,
			tables: true,
			breaks: false,
			sanitize: false,
			smartLists: true,
			smartypants: false,
			xhtml: false
		});
		this.article.markdown=marked(this.article.markdown)
	}
};
</script>

<style>
</style>

<style lang="css" scoped>
.main >>> .v-show-content {
	background: white !important;
	border: none;
}

.main >>> .v-note-panel {
	border: none;
}
</style>