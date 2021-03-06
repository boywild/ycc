/**
 * @file    Ycc.UI.SingleLineText.class.js
 * @author  xiaohei
 * @date    2017/11/15
 * @description  Ycc.UI.SingleLineText.class文件
 */




(function (Ycc) {
	
	/**
	 * 绘制单行文本
	 * @constructor
	 * @extends Ycc.UI.Base
	 * @param option	{object}		配置项
	 * @param option.content	{string}	内容
	 * @param [option.color=black]	{string}	颜色
	 * @param option.rect	{Ycc.Math.Rect}	文字的绘制区域。若超出长度，此区域会被修改
	 * @param option.overflow	{string}	水平方向超出rect之后的显示方式
	 * 		<br> `hidden` -- 直接隐藏
	 * 		<br> `auto`	-- 修改rect大小，完全显示
	 * @return {Ycc.UI}
	 */

	Ycc.UI.SingleLineText = function SingleLineText(option) {
		Ycc.UI.Base.call(this);
		
		/**
		 * 配置项
		 */
		this.option = Ycc.utils.extend({
			content:"",
			fontSize:"16px",
			fill:true,
			color:"black",
			rect:null,
			xAlign:"left",
			yAlign:"center",
			overflow:"auto"
		},option);
		
		/**
		 * 区域内显示的文本
		 * @type {string}
		 */
		this.displayContent = this.option.content;
		
		
	};
	Ycc.UI.SingleLineText.prototype = new Ycc.UI.Base();
	Ycc.UI.SingleLineText.prototype.constructor = Ycc.UI.SingleLineText;
	/**
	 * 渲染至ctx
	 * @param ctx
	 */
	Ycc.UI.SingleLineText.prototype.render = function (ctx) {
		var self = this;

		self.ctx = ctx || self.ctx;
		
		if(!self.ctx){
			console.error("[Ycc error]:","ctx is null !");
			return;
		}
		
		
		
		// 文字的绘制起点
		var x,y;
		// 字体大小
		var fontSize = parseInt(self.ctx.canvas._props.fontSize);
		// 内容的长度
		var contentWidth;
		// 配置项
		var option = this.option;
		
		option.rect = option.rect || new Ycc.Math.Rect(0,0,this.ctx.width,fontSize);
		option.color = option.color || self.ctx.fillStyle;
		
		x = option.rect.x;
		y = option.rect.y;
		contentWidth = this.ctx.measureText(option.content).width;
		
		if(fontSize>option.rect.height){
			return console.warn("[Ycc warning] : ","行高不够，或者文字太大！",option);
		}
		// 上下居中
		if(option.yAlign==="center"){
			y = y+option.rect.height/2-fontSize/2;
		}
		// 长度超长时的处理
		if(contentWidth>option.rect.width){
			if(option.overflow === "hidden"){
				self.displayContent = self.getMaxContentInWidth(option.content,option.rect.width);
			}else if(option.overflow === "auto"){
				option.rect.width = contentWidth;
			}
		}
		
		this.ctx.save();
		this.ctx.fillStyle = option.color;
		this.ctx.strokeStyle = option.color;
		this.baseUI.text([x,y],self.displayContent,option.fill);
		this.ctx.restore();
	};
	
	
	
})(window.Ycc);