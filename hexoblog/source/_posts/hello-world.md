---
title: Hello World
categories:
- 个人
tags:
- 测试
author: rausen
date: 2020-02-29 10:54:25
---
这是一个对于HEXO的markdown测试.

<!--more-->

Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

## Latex测试

### RSA算法的步骤：

- 选择两个随机素数$p$, $q$，其中$p$, $q$的二进制表示都是1024位的
- 令$n = p * q$，$\varphi(n) = (p - 1) * (q - 1)$
- 取$e = 65537$，则$(n, e)$为公钥对
- 取$d \equiv e^{-1} (mod \ \varphi(n))$，$(n, d)$为私钥对
- 销毁$p$, $q$，明文为$m$，密文为$c$，则$c = m^e \% n$, $m = c^d \% n$

## 代码测试

### 初始状态设置

我们假设这是一个简单的`3-rotor 6-plugboard enigma machine`，使用http://practicalcryptography.com/ciphers/mechanical-era/enigma/上的js来模拟生成一段明文和密文如下：
```
Plaintext: THEENIGMACIPHERWASAFIELDCIPHERUSEDBYTHEGERMANSDURINGWORLDWARIITHEENIGMAISONEOFTHEBETTERKNOWNHISTORICALENCRYPTIONMACHINESANDITACTUALLYREFERSTOARANGEOFSIMILARCIPHERMACHINES
Ring settings: AAD
Rotors: 312
Plug board settings: HN IU JK LM OP TY
Ciphertext: VDCOQJQKHVKGWDZCHACAXYYQSMOWQMBILVIGUWXRNAWJWWQXNSIRDZWMYPONJSEMBZUFSPVZYTZGJQFJWIOPQXXULBOXNTYJQQYEUWPIELALKAZIGDPTEMGCZFXOQSWIOSRJZQHYOCYUZHGRZCSMUPAZWPTMGAYTLNYIYGVTLH
```
其中`Ring settings`是转子的初始位置，`Rotors`是转子的排列顺序，则现在得到了一个Enigma密码机明文和密文，要进行已知明文攻击

程序如下，其中函数`make_enigma`是用来计算
```cpp
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <ctype.h>

#define MAXLEN 1000
#define TRUE 1
#define FALSE 0
typedef double lf;
typedef enum rotor__{ROTOR_I, ROTOR_II, ROTOR_III, ROTOR_IV,
					 ROTOR_V, ROTOR_VI, ROTOR_VII, ROTOR_VIII,
					 ROTOR_I_INV, ROTOR_II_INV, ROTOR_III_INV, ROTOR_IV_INV,
					 ROTOR_V_INV, ROTOR_VI_INV, ROTOR_VII_INV, ROTOR_VIII_INV} Rotor;

typedef enum reflector__{REFLECTOR_A, REFLECTOR_B, REFLECTOR_C} Reflector;
static char *key[16] ={"EKMFLGDQVZNTOWYHXUSPAIBRCJ",
					   "AJDKSIRUXBLHWTMCQGZNPYFVOE",
					   "BDFHJLCPRTXVZNYEIWGAKMUSQO",
					   "ESOVPZJAYQUIRHXLNFTGKDCMWB",
					   "VZBRGITYUPSDNHLXAWMJQOFECK",
					   "JPGVOUMFYQBENHZRDKASXLICTW",
					   "NZJHGRCXMYSWBOUFAIVLPEKQDT",
					   "FKQHTLXOCBJSPDZRAMEWNIUYGV",
					   // inverses
					   "UWYGADFPVZBECKMTHXSLRINQOJ",
					   "AJPCZWRLFBDKOTYUQGENHXMIVS",
					   "TAGBPCSDQEUFVNZHYIXJWLRKOM",
					   "HZWVARTNLGUPXQCEJMBSKDYOIF",
					   "QCYLXWENFTZOSMVJUDKGIARPHB",
					   "SKXQLHCNWARVGMEBJPTYFDZUIO",
					   "QMGYVPEDRCWTIANUXFKZOSLHJB",
					   "QJINSAYDVKBFRUHMCPLEWZTGXO"};
char *refl[3] = {      "EJMZALYXVBWFCRQUONTSPIKHGD",
					   "YRUHQSLDPXNGOKMIEBFZCWVJAT",
					   "FVPJIAOYEDRZXWGCTKUQSBNMHL"};
char notch[8][2] = {{'Q','Q'},{'E','E'},{'V','V'},{'J','J'},{'Z','Z'},{'Z','M'},{'Z','M'},{'Z','M'}};

char otext[] = "THEENIGMACIPHERWASAFIELDCIPHERUSEDBYTHEGERMANSDURINGWORLDWARIITHEENIGMAISONEOFTHEBETTERKNOWNHISTORICALENCRYPTIONMACHINESANDITACTUALLYREFERSTOARANGEOFSIMILARCIPHERMACHINES";
char ctext[] = "VDCOQJQKHVKGWDZCHACAXYYQSMOWQMBILVIGUWXRNAWJWWQXNSIRDZWMYPONJSEMBZUFSPVZYTZGJQFJWIOPQXXULBOXNTYJQQYEUWPIELALKAZIGDPTEMGCZFXOQSWIOSRJZQHYOCYUZHGRZCSMUPAZWPTMGAYTLNYIYGVTLH";
int rotorSeq[6][3] = {{1,2,3}, {1,3,2}, {2,1,3}, {2,3,1}, {3,1,2}, {3,2,1}};


typedef struct EnigmaKey_ {
	Rotor r[3];
	Reflector reflector;
	int ind[3];
	int ring[3];
	char plugboard[13][2];
} EnigmaKey;

typedef struct BestOpt_{
    struct BestOpt_ *next;
    struct BestOpt_ *prev;
    float score;
    EnigmaKey key;
} BestOpt;

BestOpt *newListElem(EnigmaKey *key, float score){
    BestOpt *ret = malloc(sizeof(BestOpt));
    ret -> score = score;
    ret -> next = NULL;
    ret -> prev = NULL;
    ret -> key = *key;
    return ret;
}

void freeList(BestOpt *curOpt){
    BestOpt *current = curOpt;
    if (curOpt == NULL) return;
    while(current->next != NULL){
        current = current->next;
        free(current->prev);
    }
    free(current);
}

BestOpt *best_add(BestOpt *curOpt, EnigmaKey *key, float score){
    BestOpt *elem = newListElem(key, score);
    BestOpt *current;
    int i,added = FALSE;
    if(curOpt == NULL){ 
        curOpt = elem;
        return curOpt;
    }
    current = curOpt;
    i = 0;
    while(current != NULL){
        if((score < current->score) && (added==FALSE)){
            if(current == curOpt){
                curOpt->prev = elem;
                elem->next = curOpt;
                curOpt = elem;
            }else{
                elem->prev = current->prev;
                elem->prev->next = elem;
                elem->next = current; 
                current->prev = elem;            
            }
            added = TRUE;
        }
        if(i >= MAXLEN){
            if(!added) free(elem);
            else{ 
                current->prev->next = NULL;
                freeList(current);
            }
            break;
        }
        i++;
        if((current->next == NULL) && (added==FALSE)){
            current->next = elem;
            elem->prev = current;
            break;
        }
        current = current->next;
    }
    return curOpt;
}

char apply_steckers(char ch, char steckers[13][2]){
    for(int i = 0; i < 13; i++)
        if(ch == steckers[i][0]) return steckers[i][1];
        else if(ch == steckers[i][1]) return steckers[i][0];
    return ch;
}

Rotor inverse(Rotor r){
    switch(r){
    case ROTOR_I:    return ROTOR_I_INV; 
    case ROTOR_II:   return ROTOR_II_INV;
    case ROTOR_III:  return ROTOR_III_INV;
    case ROTOR_IV:   return ROTOR_IV_INV;
    case ROTOR_V:    return ROTOR_V_INV;
    case ROTOR_VI:   return ROTOR_VI_INV;
    case ROTOR_VII:  return ROTOR_VII_INV;
    case ROTOR_VIII: return ROTOR_VIII_INV;
    default: return -1;
    }
}

char rotor(Rotor rotor, char ch, int offset){
     return (key[rotor][(ch - 'A' + 26 + offset) % 26] - offset + 26 - 'A') %26 + 'A';
}

char reflector(Reflector r, char ch){
     return refl[r][ch - 'A'];
}

void increment_indicator_settings(int settings[3], Rotor r[3]){
    if (settings[1] + 'A' == notch[r[1]][0] || settings[1] + 'A' == notch[r[1]][1]) {
        settings[0] = (settings[0] + 1) % 26;
        settings[1] = (settings[1] + 1) % 26;
    }    
    if (settings[2] + 'A' == notch[r[2]][0] || settings[2] + 'A' == notch[r[2]][1]) {
        settings[1] = (settings[1] + 1) % 26;
    }
    settings[2] = (settings[2] + 1) % 26;                     
}

int appendToPlugboard(EnigmaKey *key, char c1, char c2){
    for(int i = 0; i < 13; i++){
        if ((key -> plugboard[i][0] == c1) || (key -> plugboard[i][0] == c2)) return -1;
        else 
		if ((key -> plugboard[i][1] == c1) || (key -> plugboard[i][1] == c2)) return -1;
    } 
    for(int i = 0; i < 13; i++){
        if((key -> plugboard[i][0] < 0) && (key -> plugboard[i][1] < 0)){
            key -> plugboard[i][0] = c1;
            key -> plugboard[i][1] = c2;
            return 0;
        }
    }    
    return -1;
}

void printEnigmaKey(EnigmaKey *key){
    printf("indicator = %c%c%c, ", key->ind[0]+'A', key->ind[1]+'A', key->ind[2]+'A');
    printf("rotors = %d%d%d, ", key->r[0]+1, key->r[1]+1, key->r[2]+1);
    printf("rings = %c%c%c, plugboard = ", key->ring[0]+'A', key->ring[1]+'A', key->ring[2]+'A');
    for (int i = 0; i < 13; i++){
        if (isalpha(key->plugboard[i][0]) && isalpha(key->plugboard[i][1])){
            printf("%c%c ", key->plugboard[i][0], key->plugboard[i][1]);
        } else break;
    }
    printf("\n");
}


char enigma_encipher(char ch, EnigmaKey *key){
    ch = toupper(ch);
    increment_indicator_settings(key -> ind, key -> r);
    ch = apply_steckers(ch, key -> plugboard);
    
    ch = rotor(key -> r[2], ch, key -> ind[2] - key -> ring[2]);  
    ch = rotor(key -> r[1], ch, key -> ind[1] - key -> ring[1]);  
    ch = rotor(key -> r[0], ch, key -> ind[0] - key -> ring[0]);  

    ch = reflector(key -> reflector, ch); 
    ch = rotor(inverse(key -> r[0]), ch, key -> ind[0] - key -> ring[0]);  
    ch = rotor(inverse(key -> r[1]), ch, key -> ind[1] - key -> ring[1]);   
    ch = rotor(inverse(key -> r[2]), ch, key -> ind[2] - key -> ring[2]);   

    ch = apply_steckers(ch, key -> plugboard);   
    return ch;
}

void initEnigmaKey(EnigmaKey *key){
    key -> ind[0] = 0;
    key -> ind[1] = 0;
    key -> ind[2] = 0;
    key -> ring[0]=0;
    key -> ring[1]=0;
	key -> ring[2]=0;
	key -> r[0] = 0;
	key -> r[1] = 0;
	key -> r[2] = 0;
    key -> reflector = REFLECTOR_B;
	for(int i = 0; i < 13; i++){
        key -> plugboard[i][0] = -1;
        key -> plugboard[i][1] = -1;
    }
}

void make_enigma(EnigmaKey *key, char* from, char* to){
	int i;
    for(i = 0; i < strlen(from); i++){
        to[i] = enigma_encipher(from[i], key);
    }
    to[i] = '\0';
}

lf cal_score(char *text1,char *text2,int len) {
    lf res = 0;
    for (int i = 0; i < len; i++){
        if (text1[i] == text2[i]) res += 1;
    }
    return res;
}

BestOpt *bestOptEnd = NULL;

EnigmaKey *break_enigma(char* ctext) {
	char *ptext = malloc(sizeof(char) * (strlen(ctext) + 1));
	EnigmaKey key, tmp;
	EnigmaKey *bestKey = malloc(sizeof(EnigmaKey)), *tmpKey;
	lf score;
	
	initEnigmaKey(bestKey);
	for (int i = 0; i < 6; ++i)
		 for(int x = 0; x < 26; x++)
			for(int y = 0; y < 26; y++)
				for(int z = 0; z < 26; z++) {
					key = *bestKey;
					key.r[0] = rotorSeq[i][0] - 1;
					key.r[1] = rotorSeq[i][1] - 1;
					key.r[2] = rotorSeq[i][2] - 1;
					key.ind[0] = x;
					key.ind[1] = y;
					key.ind[2] = z;
					
					tmp = key;
					make_enigma(&tmp, ctext, ptext);
					score = -cal_score(ptext, otext, strlen(ptext));
					bestOptEnd = best_add(bestOptEnd, &key, score);
				}
	
	
	lf bestScore = 9e9;
	for(BestOpt *i = bestOptEnd; i != NULL; i = i -> next){
		tmpKey = &(i -> key);
		int y = tmpKey -> ind[1], z = tmpKey -> ind[2];
		for (int yy = 0; yy < 26; yy++)
			for (int zz = 0; zz < 26; zz++) {
				key = *tmpKey;
				key.ring[0] = 0;
				key.ring[1] = yy;
				key.ring[2] = zz;
				key.ind[1] = (y + yy) % 26;
				key.ind[2] = (z + zz) % 26;
				
				tmp = key;
				make_enigma(&tmp, ctext, ptext);
				score = -cal_score(ptext, otext, strlen(ptext));
				if (score < bestScore) {
					bestScore = score;
					*bestKey = key;
				}
			}
	}
	
	char alpha[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", first, *rest;
	for (int i = 0; i < 25; ++i) {
		first = alpha[i];
		rest = &alpha[i + 1];
		for(int j = 0; j < 25 - i; j++){
			tmp = *bestKey;
			appendToPlugboard(&tmp, first, rest[j]);
			make_enigma(&tmp, ctext, ptext);
			score = -cal_score(ptext, otext, strlen(ptext));
			if(score < bestScore){
				bestScore = score;
				appendToPlugboard(bestKey, first, rest[j]);
			}
		}
	}
	
	return bestKey;
}

int main() {
	char *ptext = malloc(sizeof(char) * (strlen(ctext) + 1));
	EnigmaKey *ref;
	ref = break_enigma(ctext);
	printf("final key: \n");
	printEnigmaKey(ref);
	return 0;
}
```

## 表格测试

### 统计字数

在已知**F解密为w**的条件下，先统计单字频数：

|字母|A|B|C|D|E|F|G|H|I|J|K|L|M|
|:----:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|频数|5&nbsp;|0&nbsp;|37|8&nbsp;|12|9&nbsp;|23|5&nbsp;|15|7&nbsp;|17|7&nbsp;|5&nbsp;|
||**N**|**O**|**P**|**Q**|**R**|**S**|**T**|**U**|**V**|**W**|**X**|**Y**|**Z**|
||13|10|6&nbsp;|1&nbsp;|0&nbsp;|20|0&nbsp;|14|0&nbsp;|5&nbsp;|7&nbsp;|14|13|
||**N**|**O**|**P**|**Q**|**R**|**S**|**T**|**U**|**V**|**W**|**X**|**Y**|**Z**|
||13|10|6&nbsp;|1&nbsp;|0&nbsp;|20|0&nbsp;|14|0&nbsp;|5&nbsp;|7&nbsp;|14|13|
||**N**|**O**|**P**|**Q**|**R**|**S**|**T**|**U**|**V**|**W**|**X**|**Y**|**Z**|
||13|10|6&nbsp;|1&nbsp;|0&nbsp;|20|0&nbsp;|14|0&nbsp;|5&nbsp;|7&nbsp;|14|13|

## html代码测试

现在的转换规则为**F → w；C → e**，得到串
<span style="font-family:Consolas;font-size:20px;">
EMGLOSUDeGDNeUSWYSwHNSweYKDPUMLWGYIeOXYSIPJeK
QPKUGKMGOLIeGINeGAeKSNISAeYKZSeKXEeJeKSHYSXeG
OIDPKZeNKSHIeGIWYGKKGKGOLDSILKGOIUSIGLEDSPWZU
G<span style="color:red;">wZeeNDGYYSw</span>USZeNXEOJNeGYEOWEUPXEZGAeGNwGLKNS
AeTGOIYeKXeJUeIUZe<span style="color:red;">wZeeNDGYYSw</span>EUEKUZeSOe<span style="color:red;">wZeeN</span>e
IAeZEJNeSHwZEJZEGMXeYHeJUMGKUeY
</span>