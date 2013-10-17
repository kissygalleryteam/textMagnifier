/**
 * @fileoverview 输入框放大镜
 * @author shuilan.cj<shuilan.cj@taobao.com>
 * @module TextMagnifier
 **/
KISSY.add(function (S, Node, Base, D, E, O,XTemplate) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 输入框放大镜
     * @class TextMagnifier
     * @constructor
     * @extends Base
     */

    function TextMagnifier(target,comConfig) {
        var self = this;
        if(!comConfig) comConfig = {};
        if(target) S.mix(comConfig,{target:target});
        //调用父类构造函数
        TextMagnifier.superclass.constructor.call(self, comConfig);
    }

    S.extend(TextMagnifier, Base, {
        /**
         * 运行
         */
        render : function(){
            var self = this;
            var inputEL= self.get('target');
            if(!inputEL.length) return self;
            var textEL;
            var content=self._getHtml();
            var width = self.get('width') ? self.get('width') : D.outerWidth(inputEL);
            var popup= new O.Popup({
                prefixCls:self.get('prefixCls'),
                content:content,
                align:{
                    node:inputEL,
                    points: self.get('align') == "top" ?['tl', 'bl']:['bl', 'tl']
                },
                closable:false,
                width: width
            });
            self.set('popup',popup);
            var delimiter = self.get('delimiter');
            var formatStr=function(str){
                var output=[];
                var start=0;
                for(var i=0 ,len = self.get('splitType').length; i<len ;i++){
                    var s=str.substr(start,self.get('splitType')[i]);
                    if(s.length > 0){
                        output.push(s);
                    }
                    start+=self.get('splitType')[i];
                }
                return output.join(delimiter);
            };


            E.on(inputEL,'valuechange',function(e){
                var str= S.trim(e.newVal);
                if(str.length >0 ){
                    popup.show();
                    if(!textEL){
                        textEL=D.get('.text',popup.get('contentEl'));
                    }
                    str=formatStr(str);
                    D.text(textEL , str);
                }else{
                    popup.hide();
                }
            });

            E.on(inputEL,'focusin' ,function(){
                if(D.val(inputEL).length > 0){
                    popup.show();
                }
            });

            E.on(inputEL,'focusout' ,function(){
                popup.hide();
            });
        },
        /**
         * 获取放大镜的html
         * @return {*}
         * @private
         */
        _getHtml:function(){
            var self = this;
            var tpl = self.get('tpl');
            if(!S.isString(tpl)) return self;
            var explainText = self.get('explainText');
            return new XTemplate(tpl).render({explainText:explainText});
        }
    }, {ATTRS : {
        /**
         * 目标元素
         */
        target:{
            value:EMPTY,
            getter:function(v) {
                return $(v);
            }
        },
        delimiter:{
            value:','
        },
        /**
         * 分割
         * @type {String}
         */
        splitType: {
            value: [3, 4, 4],
            setter: function(v) {
                return $(v);
            },
            getter: function(v) {
                return $(v);
            }
        },
        /**
         * 弹出层
         */
        popup:{
            value:EMPTY
        },
        /**
         * 弹出层模版
         */
        tpl:{
            value:'<div class="input-magnifier">'+
                        '<div class="text"></div>' +
                        '{{#if explainText}}<div class="explain">{{explainText}}</div>{{/if}}' +
                  '</div>'
        },
        /**
         * 弹出层样式前缀
         */
        prefixCls:{
            value: 'magnifier-'
        }
    }});

    return TextMagnifier;
}, {requires:['node', 'base','dom','event','overlay','xtemplate']});
/**
 * changelog
 * v1.1 by 明河
 *  - target配置方式改变
 *  - 去掉_init()
 *  - 优化代码
 *  - 增加tpl
 * */


