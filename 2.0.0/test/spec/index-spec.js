KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('textmagnifier', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/textmagnifier/2.0.0/']});