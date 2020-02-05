<template lang="html">
	<div>
		<sui-container>
			<div v-html = 'article.html' v-highlight> </div>
			<div class= 'hljs' v-html = 'article.markdown'> </div>
		</sui-container>
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
				html: '<h1><a id="_0"></a>第一次大作业</h1>\n<p>标签（空格分隔）： 现代密码学<br />\nAuthor： 计62 徐晟 2016011253</p>\n<hr />\n<h2><a id="1_Enigma_7"></a>1. Enigma密码机</h2>\n<h3><a id="_9"></a>初始状态设置</h3>\n<p>我们假设这是一个简单的<code>3-rotor 6-plugboard enigma machine</code>，使用http://practicalcryptography.com/ciphers/mechanical-era/enigma/上的js来模拟生成一段明文和密文如下：</p>\n<pre><code class="lang-">Plaintext:\nTHEENIGMACIPHERWASAFIELDCIPHERUSEDBYTHEGERMANSDURINGWORLDWARIITHEENIGMAISONEOFTHEBETTERKNOWNHISTORICALENCRYPTIONMACHINESANDITACTUALLYREFERSTOARANGEOFSIMILARCIPHERMACHINES\nRing settings: AAD\nRotors: 312\nPlug board settings: HN IU JK LM OP TY\nCiphertext: VDCOQJQKHVKGWDZCHACAXYYQSMOWQMBILVIGUWXRNAWJWWQXNSIRDZWMYPONJSEMBZUFSPVZYTZGJQFJWIOPQXXULBOXNTYJQQYEUWPIELALKAZIGDPTEMGCZFXOQSWIOSRJZQHYOCYUZHGRZCSMUPAZWPTMGAYTLNYIYGVTLH\n</code></pre>\n<p>其中<code>Ring settings</code>是转子的初始位置，<code>Rotors</code>是转子的排列顺序，则现在得到了一个Enigma密码机明文和密文，要进行已知明文攻击</p>',
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