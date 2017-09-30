/**
 * @file    Ycc.class.js
 * @author  xiaohei
 * @date    2017/9/30
 * @description  Ycc.class文件
 *
 */




(function (win) {
	
	/**
	 * 应用启动入口类，每个实例都与一个canvas绑定
	 * @param canvasDom
	 * @param options				{Object}	启动配置项
	 * @param options.canvasBg		{String}	背景色
	 *
	 * @constructor
	 */
	win.Ycc = function Ycc(canvasDom,options){
		/**
		 * canvas的Dom对象
		 */
		this.canvasDom = canvasDom;
		/**
		 * 绘图环境
		 * @type {CanvasRenderingContext2D}
		 */
		this.ctx = canvasDom.getContext("2d");
		/**
		 * 可绘图区的宽
		 */
		this.ctxWidth = canvasDom.width;
		/**
		 * 可绘图区的高
		 */
		this.ctxHeight = canvasDom.height;
		/**
		 * 配置对象，配置默认线条颜色、线条宽度、填充颜色、字体颜色、大小、默认canvas背景色等内容
		 * @default {}
		 */
		this.options = options || {};

		/**
		 * 实例的图形管理模块
		 * @type {Ycc.UI}
		 */
		this.ui = new Ycc.UI(this);
		
		/**
		 * 实例的快照管理模块
		 * @type {Ycc.PhotoManager}
		 */
		this.photoManager = new Ycc.PhotoManager(this);
		
		/**
		 * 实例的事件管理模块
		 * @type {Ycc.EventManager}
		 */
		this.eventManager = new Ycc.EventManager(this);
		
		this.init();
	};
	
	/**
	 * 类初始化
	 */
	win.Ycc.prototype.init = function () {
		var self = this;
		// 填充背景
		this.ctx.fillStyle = this.options.canvasBg||"#fff";
		this.ctx.fillRect(0,0,this.ctxWidth,this.ctxHeight);
	};
	
	
	
	
})(window);