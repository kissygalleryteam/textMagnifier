/**
 * @fileoverview
 * @author
 * @module textmagnifier
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     *
     * @class Textmagnifier
     * @constructor
     * @extends Base
     */
    function Textmagnifier(comConfig) {
        var self = this;
        //调用父类构造函数
        Textmagnifier.superclass.constructor.call(self, comConfig);
    }
    S.extend(Textmagnifier, Base, /** @lends Textmagnifier.prototype*/{

    }, {ATTRS : /** @lends Textmagnifier*/{

    }});
    return Textmagnifier;
}, {requires:['node', 'base']});



