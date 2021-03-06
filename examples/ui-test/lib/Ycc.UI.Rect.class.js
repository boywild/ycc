/**
 * @file    Ycc.UI.Rect.class.js
 * @author  xiaohei
 * @date    2017/11/17
 * @description  Ycc.UI.Rect.class文件
 */



(function (Ycc) {
	
	/**
	 * 方块
	 * @param option	{object}
	 * @constructor
	 */
	Ycc.UI.Rect = function Rect(option) {
		Ycc.UI.Base.call(this);
		
		/**
		 * 配置项
		 */
		this.option = Ycc.utils.extend({
			rect:null,
			fill:true,
			color:"black"
		},option);
		
	};
	Ycc.UI.Rect.prototype = new Ycc.UI.Base();
	Ycc.UI.Rect.prototype.constructor = Ycc.UI.Rect;
	
	/**
	 * 绘制
	 */
	Ycc.UI.Rect.prototype.render = function () {
		var rect = this.option.rect;

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.fillStyle = this.option.color;
		this.ctx.strokeStyle = this.option.color;
		this.ctx.rect(rect.x,rect.y,rect.width,rect.height);
		this.ctx.closePath();
		if(!this.option.fill)
			this.ctx.stroke();
		else
			this.ctx.fill();
		this.ctx.restore();
	};
	
	
	
	
})(window.Ycc);