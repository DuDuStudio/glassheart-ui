import { Injectable, ElementRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, distinctUntilChanged } from 'rxjs';
import { getDisplacementFilter } from '../components/LiquidGlassElement/getDisplacementFilter';

export interface LiquidGlassOptions {
  depth?: number;
  strength?: number;
  chromaticAberration?: number;
  blur?: number;
}

export interface LiquidGlassState {
  clicked: boolean;
  hovered: boolean;
  depth: number;
}

export interface Dimensions {
  width: number;
  height: number;
  radius: number;
}

@Injectable({
  providedIn: 'root'
})
export class UseLiquidGlassService implements OnDestroy {
  private stateSubject = new BehaviorSubject<LiquidGlassState>({
    clicked: false,
    hovered: false,
    depth: 8,
  });

  private dimensionsSubject = new BehaviorSubject<Dimensions>({ 
    width: 0, 
    height: 0, 
    radius: 0 
  });

  private elementRef: ElementRef<HTMLElement> | null = null;
  private resizeListener?: () => void;
  private mouseDownListener?: () => void;
  private mouseUpListener?: () => void;
  private mouseEnterListener?: () => void;
  private mouseLeaveListener?: () => void;
  private debounceTimeout?: number;
  private options: LiquidGlassOptions = {};

  public state$ = this.stateSubject.asObservable();
  public dimensions$ = this.dimensionsSubject.asObservable();

  public liquidGlassStyle$: Observable<{ backdropFilter: string }> = combineLatest([
    this.dimensions$,
    this.state$
  ]).pipe(
    map(([dimensions, state]) => {
      const currentDepth = state.clicked ? state.depth / 0.7 : state.depth;
      
      if (dimensions.width === 0 || dimensions.height === 0) {
        return { backdropFilter: `blur(${this.options.blur || 2 / 2}px) brightness(1.1) saturate(1.5)` };
      }
      
      const displacementFilterUrl = getDisplacementFilter({
        width: dimensions.width,
        height: dimensions.height,
        radius: dimensions.radius,
        depth: currentDepth,
        strength: this.options.strength || 100,
        chromaticAberration: this.options.chromaticAberration || 0,
      });

      const backdropFilter = `blur(${(this.options.blur || 2) / 2}px) url('${displacementFilterUrl}') blur(${this.options.blur || 2}px) brightness(1.1) saturate(1.5)`;
      
      return { backdropFilter };
    }),
    distinctUntilChanged((prev, curr) => prev.backdropFilter === curr.backdropFilter)
  );

  public useLiquidGlass(options: LiquidGlassOptions = {}) {
    const {
      depth: baseDepth = 8,
      strength = 100,
      chromaticAberration = 0,
      blur = 2,
    } = options;

    this.options = options;

    this.stateSubject.next({
      clicked: false,
      hovered: false,
      depth: baseDepth,
    });

    return {
      elementRef: (ref: ElementRef<HTMLElement>) => {
        this.elementRef = ref;
        this.setupEventListeners();
        this.updateDimensions();
      },
      state$: this.state$,
      dimensions$: this.dimensions$,
      liquidGlassStyle$: this.liquidGlassStyle$,
      handleMouseDown: () => this.handleMouseDown(),
      handleMouseUp: () => this.handleMouseUp(),
      handleMouseEnter: () => this.handleMouseEnter(),
      handleMouseLeave: () => this.handleMouseLeave(),
    };
  }

  // 優化事件處理器，減少不必要的狀態更新
  private handleMouseDown() {
    const currentState = this.stateSubject.value;
    if (!currentState.clicked) {
      this.stateSubject.next({
        ...currentState,
        clicked: true,
      });
    }
  }

  private handleMouseUp() {
    const currentState = this.stateSubject.value;
    if (currentState.clicked) {
      this.stateSubject.next({
        ...currentState,
        clicked: false,
      });
    }
  }

  // 使用防抖優化 hover 事件
  private handleMouseEnter() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    
    this.debounceTimeout = window.setTimeout(() => {
      const currentState = this.stateSubject.value;
      if (!currentState.hovered) {
        this.stateSubject.next({
          ...currentState,
          hovered: true,
        });
      }
    }, 16); // 約 60fps
  }

  private handleMouseLeave() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = undefined;
    }
    
    const currentState = this.stateSubject.value;
    if (currentState.hovered || currentState.clicked) {
      this.stateSubject.next({
        ...currentState,
        hovered: false,
        clicked: false,
      });
    }
  }

  private updateDimensions() {
    if (this.elementRef?.nativeElement) {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(this.elementRef.nativeElement);
      const borderRadius = parseFloat(computedStyle.borderRadius) || 0;
      
      // 確保獲取精確的像素值
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      
      this.dimensionsSubject.next({
        width,
        height,
        radius: borderRadius,
      });
    }
  }

  // 使用 requestAnimationFrame 優化尺寸更新
  private updateWithRAF = () => {
    requestAnimationFrame(() => this.updateDimensions());
  };

  private setupEventListeners() {
    if (this.elementRef?.nativeElement) {
      const element = this.elementRef.nativeElement;
      
      this.mouseDownListener = () => this.handleMouseDown();
      this.mouseUpListener = () => this.handleMouseUp();
      this.mouseEnterListener = () => this.handleMouseEnter();
      this.mouseLeaveListener = () => this.handleMouseLeave();
      this.resizeListener = () => this.updateWithRAF();

      element.addEventListener('mousedown', this.mouseDownListener);
      element.addEventListener('mouseup', this.mouseUpListener);
      element.addEventListener('mouseenter', this.mouseEnterListener);
      element.addEventListener('mouseleave', this.mouseLeaveListener);
      window.addEventListener('resize', this.resizeListener);
    }
  }

  ngOnDestroy() {
    // 清理防抖定時器
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = undefined;
    }
    
    if (this.elementRef?.nativeElement) {
      const element = this.elementRef.nativeElement;
      
      if (this.mouseDownListener) {
        element.removeEventListener('mousedown', this.mouseDownListener);
      }
      if (this.mouseUpListener) {
        element.removeEventListener('mouseup', this.mouseUpListener);
      }
      if (this.mouseEnterListener) {
        element.removeEventListener('mouseenter', this.mouseEnterListener);
      }
      if (this.mouseLeaveListener) {
        element.removeEventListener('mouseleave', this.mouseLeaveListener);
      }
    }
    
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }
}
