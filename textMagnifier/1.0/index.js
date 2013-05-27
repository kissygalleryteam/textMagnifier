/**
 * @fileoverview 输入框放大镜
 * @author shuilan.cj<shuilan.cj@taobao.com>
 * @module TextMagnifier
 **/
KISSY.add(function (S, Node, Base, D, E, O) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 请修改组件描述
     * @class TextMagnifier
     * @constructor
     * @extends Base
     */

    var styles = '.input-magnifier{font-size: 20px;border: solid 1px #ffd2b2;background: #fffae5;padding: 0 0 0 10px;color: #ff4400;min-height: 30px;}'+
        '.input-magnifier .explain{font-size: 12px;color: #b2b2b2;border-top: 1px solid #ffd2b2;margin: 0 10px 3px 0;padding: 3px 0;}'+
        '.input-magnifier .text {_height: 32px; line-height: 30px; font-weight: bold;}';
    D.addStyleSheet(styles);

    function TextMagnifier(comConfig) {
        var self = this;
        //调用父类构造函数
        TextMagnifier.superclass.constructor.call(self, comConfig);
    }

    S.extend(TextMagnifier, Base, {
        render : function(){
            this._init();
        },
        _init : function(){
            var self = this;

            var inputEL= D.get(self.get('id'));
            var textEL;

            var content='<div class="input-magnifier">'+
                '<div class="text"></div>';
            if(self.get('explainText')){
                content=content+ '<div class="explain">'+self.get('explainText')+'</div>';
            }
            content=content+'</div>';

            var popup=new O.Popup({
                content:content,
                align:{
                    node:inputEL,
                    points: self.get('align') == "top" ?['tl', 'bl']:['bl', 'tl']
                },
                closable:false,
                width:self.get('width') ? self.get('width') : D.outerWidth(inputEL)-2
            });


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
                return output.join(self.get('delimiter'));
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
        }
    }, {ATTRS : /** @lends New*/{
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
        }
    }});

    return TextMagnifier;
}, {requires:['node', 'base','dom','event','overlay']});



