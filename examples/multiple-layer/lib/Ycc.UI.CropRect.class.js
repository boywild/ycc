/**
 * @file    Ycc.UI.CropRect.class.js
 * @author  xiaohei
 * @date    2017/11/29
 * @description  Ycc.UI.CropRect.class文件
 */



(function (Ycc) {
	
	/**
	 * 裁剪框
	 * @param option	{object}		所有可配置的配置项
	 * @param option.rect	{Ycc.Math.Rect}	容纳区。会根据属性设置动态修改。
	 * @param option.fill=true {boolean}	填充or描边
	 * @constructor
	 * @extends Ycc.UI.Base
	 */
	Ycc.UI.CropRect = function CropRect(option) {
		Ycc.UI.Base.call(this,option);
		
		/**
		 * 控制点的大小
		 * @type {number}
		 */
		this.ctrlSize = 6;
		
		/**
		 * 是否填充
		 * @type {boolean}
		 */
		this.fill = true;
		
		/**
		 * 左上角 的控制点
		 * @type {Ycc.Math.Rect}
		 */
		this.ctrlRect1 = new Ycc.Math.Rect();
		/**
		 * 右上角 的控制点
		 * @type {Ycc.Math.Rect}
		 */
		this.ctrlRect2 = new Ycc.Math.Rect();
		/**
		 * 左下角 的控制点
		 * @type {Ycc.Math.Rect}
		 */
		this.ctrlRect3 = new Ycc.Math.Rect();
		/**
		 * 右下角 的控制点
		 * @type {Ycc.Math.Rect}
		 */
		this.ctrlRect4 = new Ycc.Math.Rect();
		
		this.extend(option);
		
		this._initUI();
	};
	Ycc.UI.CropRect.prototype = new Ycc.UI.Base();
	Ycc.UI.CropRect.prototype.constructor = Ycc.UI.CropRect;
	
	
	/**
	 * 计算UI的各种属性。此操作必须在绘制之前调用。
	 */
	Ycc.UI.CropRect.prototype.computeUIProps = function () {
		var rect = this.rect;
		this.ctrlRect1 = (new Ycc.Math.Rect(rect.x,rect.y,this.ctrlSize,this.ctrlSize));
		this.ctrlRect2 = (new Ycc.Math.Rect(rect.x+rect.width-this.ctrlSize,rect.y,this.ctrlSize,this.ctrlSize));
		this.ctrlRect3 = (new Ycc.Math.Rect(rect.x,rect.y+rect.height-this.ctrlSize,this.ctrlSize,this.ctrlSize));
		this.ctrlRect4 = (new Ycc.Math.Rect(rect.x+rect.width-this.ctrlSize,rect.y+rect.height-this.ctrlSize,this.ctrlSize,this.ctrlSize));
	};
	
	/**
	 * 初始化UI
	 * @private
	 */
	Ycc.UI.CropRect.prototype._initUI = function () {
		this.userData = this.userData?this.userData:{};
		this.addListener("dragstart",function (e) {
			this.userData.ctrlStart = 0;
			this.userData.dragStartPosition = new Ycc.Math.Rect(this.rect);
			var dot = new Ycc.Math.Dot(e);
			for(var i=1;i<=4;i++){
				if(dot.isInRect(this["ctrlRect"+i])){
					this.userData.ctrlStart = i;
					return null;
				}
			}
		});
		
		this.addListener("dragging",function (e) {
			var r = this.userData.dragStartPosition;
			var x,y,width,height;
			// 控制点的拖拽事件
			if(this.userData.ctrlStart<=4&&this.userData.ctrlStart>=1){
				if(this.userData.ctrlStart===1 ){
					x = e.x;
					y = e.y;
					width = r.width-(e.x-r.x);
					height = r.height-(e.y-r.y);
					if(x<=r.x+r.width-this.ctrlSize*2)
						this.rect.x = x;
					if(y<=r.y+r.height-this.ctrlSize*2)
						this.rect.y = y;
					
				}
				if(this.userData.ctrlStart===2){
					x = r.x;
					y = e.y;
					width = e.x-r.x;
					height = r.height-(e.y-r.y);
					this.rect.x = x;
					if(y<=r.y+r.height-this.ctrlSize*2)
						this.rect.y = y;
				}
				if(this.userData.ctrlStart===3){
					x = e.x;
					y = r.y;
					width = r.width-(e.x-r.x);
					height = e.y - r.y;
					if(x<=r.x+r.width-this.ctrlSize*2)
						this.rect.x = x;
					this.rect.y = y;
				}
				if(this.userData.ctrlStart===4){
					this.rect.x = r.x;
					this.rect.y = r.y;
					this.rect.width = (e.x-r.x);
					this.rect.height = (e.y-r.y);
				}
				
				
				if(width>=this.ctrlSize*2)
					this.rect.width = width;
				if(height>=this.ctrlSize*2)
					this.rect.height = height;
				
			}else{
				// 选框的拖拽事件
				this.rect.x = e.x-e.mouseDownYccEvent.targetDeltaPosition.x;
				this.rect.y = e.y-e.mouseDownYccEvent.targetDeltaPosition.y;
			}
			if(this.rect.width<=this.ctrlSize*2){
				this.rect.width = this.ctrlSize*2;
			}
			if(this.rect.height<=this.ctrlSize*2){
				this.rect.height = this.ctrlSize*2;
			}

			/**
			 * @todo 此处是否在UI内渲染，有待考虑
			 */
			this.belongTo.yccInstance.layerManager.reRenderAllLayerToStage();
		});
	};
	
	/**
	 * 绘制
	 */
	Ycc.UI.CropRect.prototype.render = function () {
		this.renderRectBgColor();
		
		var rect = this.rect;
		
		this.ctx.save();
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.strokeStyle = this.strokeStyle;
		
		this.ctx.beginPath();
		this.ctx.rect(rect.x,rect.y,rect.width,rect.height);
		this.ctx.closePath();
		if(!this.fill)
			this.ctx.stroke();
		else
			this.ctx.fill();
		
		
		this.ctx.beginPath();
		this.ctx.rect(this.ctrlRect1.x,this.ctrlRect1.y,this.ctrlRect1.width,this.ctrlRect1.height);
		this.ctx.rect(this.ctrlRect2.x,this.ctrlRect2.y,this.ctrlRect2.width,this.ctrlRect2.height);
		this.ctx.rect(this.ctrlRect3.x,this.ctrlRect3.y,this.ctrlRect3.width,this.ctrlRect3.height);
		this.ctx.rect(this.ctrlRect4.x,this.ctrlRect4.y,this.ctrlRect4.width,this.ctrlRect4.height);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
	};
	
	
	
	
})(window.Ycc);