## 综述 ##

- 版本：1.1
- 基于：kissy2.0.0+
- 作者：水澜(1.0) | 明河（1.1）

仿支付宝的文本输入框放大组件，同时还具有以下特性：

- 拆分规则和分隔符可自定义，例如设置手机号的分割方式为[3,4,4],分割符为'-',则被放大显示为187-XXXX-XXXX
- 可以在放大的同时给出相应的文案提示
- 可以自行设置对齐方式

## 使用方法 ##

##HTML

    <input type="text" class="text-input" id="J_receiveMob" maxlength="11" autocomplete="off"/>

##初始化组件

    S.use('kg/textMagnifier/1.1/index,kg/textMagnifier/1.1/style.css',function (S,TextMagnifier) {
        //手机号码放大
        new TextMagnifier("#J_receiveMob",{
            align:"top",
            splitType:[3,4,4],
            delimiter:' '
        }).render();
    });
