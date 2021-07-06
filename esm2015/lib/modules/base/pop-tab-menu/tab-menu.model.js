export class TabConfig {
    constructor(params) {
        this.hidden = false;
        this.path = '';
        this.scheme = false;
        this.overhead = 0;
        this.sections = null;
        this.syncPositions = false;
        this.requireRefresh = false;
        this.when = null;
        this.wrap = true;
        this.columnWrap = true;
        this.groups = {};
        if (params)
            for (const i in params)
                this[i] = params[i];
        if (!this.name)
            this.name = this.id.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            });
        if (!this.path)
            this.path = this.id.replace(/_/g, '-').toLowerCase();
        if (!this.metadata)
            this.metadata = {};
        if (!this.syncPositionMap)
            this.syncPositionMap = {};
        if (!this.positions)
            this.positions = { 1: { flex: 1 } };
        Object.keys(this.positions).map((position) => {
            if (!this.positions[position].min)
                this.positions[position].multiple_min = null;
            if (!this.positions[position].max)
                this.positions[position].multiple_max = null;
            if (!this.positions[position].flex && this.positions[position].cols)
                this.positions[position].flex = this.positions[position].cols;
            delete this.positions[position].cols;
        });
    }
}
export class TabMenuConfig {
    constructor(params) {
        this.name = '';
        this.goBack = true;
        this.tabs = [];
        this.buttons = [];
        this.portal = false;
        this.metadata = {};
        this.loaded = false;
        this.loading = false;
        if (params)
            for (const i in params)
                this[i] = params[i];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW1lbnUubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wb3AtY29tbW9uL3NyYy9saWIvbW9kdWxlcy9iYXNlL3BvcC10YWItbWVudS90YWItbWVudS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrRUEsTUFBTSxPQUFPLFNBQVM7SUErQnBCLFlBQWEsTUFBb0I7UUE1QmpDLFdBQU0sR0FBSSxLQUFLLENBQUM7UUFDaEIsU0FBSSxHQUFJLEVBQUUsQ0FBQztRQUVYLFdBQU0sR0FBSSxLQUFLLENBQUM7UUFDaEIsYUFBUSxHQUFJLENBQUMsQ0FBQztRQU1kLGFBQVEsR0FBSSxJQUFJLENBQUM7UUFFakIsa0JBQWEsR0FBSSxLQUFLLENBQUM7UUFFdkIsbUJBQWMsR0FBSSxLQUFLLENBQUM7UUFPeEIsU0FBSSxHQUFJLElBQUksQ0FBQztRQUViLFNBQUksR0FBSSxJQUFJLENBQUM7UUFDYixlQUFVLEdBQUksSUFBSSxDQUFDO1FBQ25CLFdBQU0sR0FBc0MsRUFBRSxDQUFDO1FBSTdDLElBQUksTUFBTTtZQUFHLEtBQUssTUFBTSxDQUFDLElBQUksTUFBTTtnQkFBRyxJQUFJLENBQUUsQ0FBQyxDQUFFLEdBQUcsTUFBTSxDQUFFLENBQUMsQ0FBRSxDQUFDO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBRSxDQUFDLE9BQU8sQ0FBRSxhQUFhLEVBQUUsVUFBVSxDQUFDO2dCQUMzRixPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QixDQUFDLENBQUUsQ0FBQztRQUVKLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZTtZQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQyxHQUFHLENBQUUsQ0FBRSxRQUFRLEVBQUcsRUFBRTtZQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxRQUFRLENBQUUsQ0FBQyxHQUFHO2dCQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsUUFBUSxDQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUNyRixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxRQUFRLENBQUUsQ0FBQyxHQUFHO2dCQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsUUFBUSxDQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUNyRixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxRQUFRLENBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBRSxRQUFRLENBQUUsQ0FBQyxJQUFJO2dCQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsUUFBUSxDQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsUUFBUSxDQUFFLENBQUMsSUFBSSxDQUFDO1lBQzVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBRSxRQUFRLENBQUUsQ0FBQyxJQUFJLENBQUM7UUFDekMsQ0FBQyxDQUFFLENBQUM7SUFDTixDQUFDO0NBQ0Y7QUE0QkQsTUFBTSxPQUFPLGFBQWE7SUFXeEIsWUFBYSxNQUF5QjtRQVZ0QyxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLFNBQUksR0FBcUIsRUFBRSxDQUFDO1FBQzVCLFlBQU8sR0FBOEIsRUFBRSxDQUFDO1FBQ3hDLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsYUFBUSxHQUFvQixFQUFFLENBQUM7UUFDL0IsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFJZCxJQUFJLE1BQU07WUFBRyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU07Z0JBQUcsSUFBSSxDQUFFLENBQUMsQ0FBRSxHQUFHLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBQztJQUNoRSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb3JlQ29uZmlnLCBEaWN0aW9uYXJ5LCBFbnRpdHlFeHRlbmRJbnRlcmZhY2UsIEV2ZW50Q2FsbGJhY2ssIE91dGxldFJlc2V0LCBQb3BCYXNlRXZlbnRJbnRlcmZhY2UsIFNlY3Rpb25Db25maWcgfSBmcm9tICcuLi8uLi8uLi9wb3AtY29tbW9uLm1vZGVsJztcbmltcG9ydCB7IEZpZWxkSXRlbUdyb3VwQ29uZmlnIH0gZnJvbSAnLi4vcG9wLWZpZWxkLWl0ZW0tZ3JvdXAvcG9wLWZpZWxkLWl0ZW0tZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgdHlwZSBUYWJMb2FkQ2FsbGJhY2sgPSAoIGNvbmZpZzogQ29yZUNvbmZpZywgdGFiOiBUYWJDb25maWcgKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgVGFiVW5sb2FkQ2FsbGJhY2sgPSAoIGNvbmZpZzogQ29yZUNvbmZpZywgdGFiOiBUYWJDb25maWcgKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgVGFiQ29yZUNhbGxiYWNrID0gKCBldmVudDogUG9wQmFzZUV2ZW50SW50ZXJmYWNlICkgPT4gdm9pZDtcblxuXG5jb25zdCBlbnVtIFRhYlBvc2l0aW9uIHtcbiAgbGVmdCA9ICdsZWZ0JyxcbiAgY2VudGVyID0gJ2NlbnRlcicsXG4gIHJpZ2h0ID0gJ2NlbnRlcidcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFRhYkNvbXBvbmVudEludGVyZmFjZSB7XG4gIHR5cGU6IENvbXBvbmVudFR5cGU8YW55PjtcbiAgaW5wdXRzPzogRGljdGlvbmFyeTxhbnk+O1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBuYW1lPzogc3RyaW5nO1xuICB3aWR0aD86IHN0cmluZztcbiAgaGVhZGVyPzogc3RyaW5nO1xuICB3aGVuPzphbnlbXTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFRhYlBvc2l0aW9uSW50ZXJmYWNlIHtcbiAgaWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGZsZXg6IG51bWJlcjtcbiAgbWF4V2lkdGg/OiBudW1iZXI7XG4gIG1pbldpZHRoPzogbnVtYmVyO1xuICBtYXhIZWlnaHQ/OiBudW1iZXI7XG4gIHBvc2l0aW9uPzogbnVtYmVyO1xuICBjb21wb25lbnRzPzogVGFiQ29tcG9uZW50SW50ZXJmYWNlW107XG4gIHJlc2V0PzogU3ViamVjdDxhbnk+O1xuICBoZWFkZXI/OiBzdHJpbmc7XG4gIGV4dGVuc2lvbj86IEVudGl0eUV4dGVuZEludGVyZmFjZTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFRhYkludGVyZmFjZSB7XG4gIGlkOiBzdHJpbmc7XG4gIGhpZGRlbj86IGJvb2xlYW47XG4gIHBvc2l0aW9ucz86IGFueTtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgbWV0YWRhdGE/OiBvYmplY3Q7XG4gIG9uTG9hZD86IFRhYkxvYWRDYWxsYmFjazsgLy8gaW5pdGlhbCBsb2FkIGV2ZW50IGhvb2sgZm9yIGN1c3RvbSBsb2dpY1xuICBvbkV2ZW50PzogRXZlbnRDYWxsYmFjazsgIC8vIG1haW4gZXZlbnQgaG9vayBmb3IgY3VzdG9tIGxvZ2ljXG4gIG92ZXJoZWFkPzogbnVtYmVyOyAgICAgICAvLyBjb21wdXRlIGV4dHJhIG92ZXJoZWFkIGFzc2lnbmVkIGJ5IHBhcmVudCBjb21wb25lbnRcbiAgb25VbmxvYWQ/OiBUYWJVbmxvYWRDYWxsYmFjaztcbiAgcmVxdWlyZVJlZnJlc2g/OiBib29sZWFuOyAgICAgICAgLy8gcmVxdWlyZSBhbiBhcGkgY2FsbCB0byByZWZyZXNoIHRoZSBlbnRpdHlJZCBvbiBldmVyeSBsb2FkXG4gIHNjaGVtZT86IGJvb2xlYW47XG4gIHNlY3Rpb25zPzogU2VjdGlvbkNvbmZpZ1tdO1xuICBzeW5jUG9zaXRpb25GaWVsZHM/OiBzdHJpbmdbXTsgLy8gYSBsaXN0IG9mIGZpZWxkSXRlbXMgdGhhdCBzaG91bGQgb25seSB0cmlnZ2VyIHRhYiB0byByZWxvYWQgbW9kdWxlcyBvZiB0aGUgdGFiXG4gIHN5bmNQb3NpdGlvbk1hcD86IERpY3Rpb25hcnk8bnVtYmVyW10+OyAvLyBhIG1vcmUgc3BlY2lmaWMgbWFwcGluZyB0byBzcGVjaWZ5IGNlcnRhaW4gcG9zaXRpb25zIHRvIHJlbG9hZCB3aXRoIGEgcGF0Y2ggY29tZXMgZnJvbSBhIGNlcnRhaW4gcG9zaXRpb25cbiAgc3luY1Bvc2l0aW9ucz86IGJvb2xlYW47ICAvLyBhIGdlbmVyYWwgc3dpdGNoIHRoYXQgdHJpZ2dlcnMgYWxsIHBvc2l0aW9ucyB0byByZXNldCBvbiBhIHBhdGNoLCBzaG91bGQgYmUgcmVkdWNlZCBieSBwcm92aWRpbmcgc3luY1Bvc2l0aW9uRmllbGRzIDxbJ3NlY3VyaXR5X3Byb2ZpbGVfZmsnLCAndHlwZV9mayddPiBvciBzeW5jUG9zaXRpb25NYXAgPHsnbGVmdCc6WydyaWdodCddPn1cbiAgd3JhcD86IGJvb2xlYW47ICAgLy8gSW5kaWNhdGUgd2hldGhlciB0aGlzIHRhYiBzaG91bGQgaGF2ZSB0aGUgZGVmYXVsdCB3cmFwcGVyIC5pZSBtYXJnaW4sIHNvbWV0aW1lcyBhIHRhYiBtaWdodCBiZSBmcmFtZWQgZnJvbSB3aXRoaW4gYW5vdGhlciB0YWIgdGhhdCBhbHJlYWR5IGhhcyB0aGUgd3JhcFxuICBjb2x1bW5XcmFwPzogYm9vbGVhbjsgICAvLyBJbmRpY2F0ZSB3aGV0aGVyIHRoaXMgdGFiIHNob3VsZCBoYXZlIHRoZSBkZWZhdWx0IHdyYXBwZXIgLmllIG1hcmdpbiwgc29tZXRpbWVzIGEgdGFiIG1pZ2h0IGJlIGZyYW1lZCBmcm9tIHdpdGhpbiBhbm90aGVyIHRhYiB0aGF0IGFscmVhZHkgaGFzIHRoZSB3cmFwXG4gIHdoZW4/OiBhbnlbXTsgIC8vIGNvbmRpdGlvbmFsIHdoZXRoZXIgdG8gc2hvdyB0YWIgb3Igbm90XG59XG5cblxuZXhwb3J0IGNsYXNzIFRhYkNvbmZpZyB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGhpZGRlbj8gPSBmYWxzZTtcbiAgcGF0aD8gPSAnJztcbiAgbWV0YWRhdGE/OiBvYmplY3Q7XG4gIHNjaGVtZT8gPSBmYWxzZTtcbiAgb3ZlcmhlYWQ/ID0gMDtcbiAgcG9zaXRpb25zPzoge1xuICAgIDE/OiBUYWJQb3NpdGlvbkludGVyZmFjZSxcbiAgICAyPzogVGFiUG9zaXRpb25JbnRlcmZhY2UsXG4gICAgMz86IFRhYlBvc2l0aW9uSW50ZXJmYWNlLFxuICB9O1xuICBzZWN0aW9ucz8gPSBudWxsO1xuICBzeW5jUG9zaXRpb25GaWVsZHM/OiBzdHJpbmdbXTtcbiAgc3luY1Bvc2l0aW9ucz8gPSBmYWxzZTtcbiAgc3luY1Bvc2l0aW9uTWFwPzogRGljdGlvbmFyeTxudW1iZXJbXT47XG4gIHJlcXVpcmVSZWZyZXNoPyA9IGZhbHNlO1xuICBvbkxvYWQ/OiBUYWJMb2FkQ2FsbGJhY2s7XG4gIG9uRXZlbnQ/OiBFdmVudENhbGxiYWNrO1xuICBvblVubG9hZD86IFRhYlVubG9hZENhbGxiYWNrO1xuICAvLyBpbnRlcm5hbCBhc3NldHNcbiAgdmlldz86IGFueTtcbiAgcmVzZXRWaWV3PzogT3V0bGV0UmVzZXQ7XG4gIHdoZW4/ID0gbnVsbDtcblxuICB3cmFwPyA9IHRydWU7XG4gIGNvbHVtbldyYXA/ID0gdHJ1ZTtcbiAgZ3JvdXBzPzogRGljdGlvbmFyeTxGaWVsZEl0ZW1Hcm91cENvbmZpZz4gPSB7fTtcblxuXG4gIGNvbnN0cnVjdG9yKCBwYXJhbXM6IFRhYkludGVyZmFjZSApe1xuICAgIGlmKCBwYXJhbXMgKSBmb3IoIGNvbnN0IGkgaW4gcGFyYW1zICkgdGhpc1sgaSBdID0gcGFyYW1zWyBpIF07XG4gICAgaWYoICF0aGlzLm5hbWUgKSB0aGlzLm5hbWUgPSB0aGlzLmlkLnJlcGxhY2UoIC9fL2csICcgJyApLnJlcGxhY2UoIC8oPzpefFxccylcXFMvZywgZnVuY3Rpb24oIGEgKXtcbiAgICAgIHJldHVybiBhLnRvVXBwZXJDYXNlKCk7XG4gICAgfSApO1xuXG4gICAgaWYoICF0aGlzLnBhdGggKSB0aGlzLnBhdGggPSB0aGlzLmlkLnJlcGxhY2UoIC9fL2csICctJyApLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYoICF0aGlzLm1ldGFkYXRhICkgdGhpcy5tZXRhZGF0YSA9IHt9O1xuICAgIGlmKCAhdGhpcy5zeW5jUG9zaXRpb25NYXAgKSB0aGlzLnN5bmNQb3NpdGlvbk1hcCA9IHt9O1xuICAgIGlmKCAhdGhpcy5wb3NpdGlvbnMgKSB0aGlzLnBvc2l0aW9ucyA9IHsgMTogeyBmbGV4OiAxIH0gfTtcbiAgICBPYmplY3Qua2V5cyggdGhpcy5wb3NpdGlvbnMgKS5tYXAoICggcG9zaXRpb24gKSA9PiB7XG4gICAgICBpZiggIXRoaXMucG9zaXRpb25zWyBwb3NpdGlvbiBdLm1pbiApIHRoaXMucG9zaXRpb25zWyBwb3NpdGlvbiBdLm11bHRpcGxlX21pbiA9IG51bGw7XG4gICAgICBpZiggIXRoaXMucG9zaXRpb25zWyBwb3NpdGlvbiBdLm1heCApIHRoaXMucG9zaXRpb25zWyBwb3NpdGlvbiBdLm11bHRpcGxlX21heCA9IG51bGw7XG4gICAgICBpZiggIXRoaXMucG9zaXRpb25zWyBwb3NpdGlvbiBdLmZsZXggJiYgdGhpcy5wb3NpdGlvbnNbIHBvc2l0aW9uIF0uY29scyApIHRoaXMucG9zaXRpb25zWyBwb3NpdGlvbiBdLmZsZXggPSB0aGlzLnBvc2l0aW9uc1sgcG9zaXRpb24gXS5jb2xzO1xuICAgICAgZGVsZXRlIHRoaXMucG9zaXRpb25zWyBwb3NpdGlvbiBdLmNvbHM7XG4gICAgfSApO1xuICB9XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBUYWJCdXR0b25JbnRlcmZhY2Uge1xuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIG1ldGFkYXRhPzogYW55O1xuICBoaWRkZW4/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGFjY2Vzc1R5cGU/OiBzdHJpbmc7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBUYWJNZW51SW50ZXJmYWNlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBnb0JhY2s/OiBib29sZWFuO1xuICBwb3J0YWw/OiBib29sZWFuO1xuICB0YWJzPzogQXJyYXk8VGFiQ29uZmlnPjtcbiAgYnV0dG9ucz86IEFycmF5PFRhYkJ1dHRvbkludGVyZmFjZT47XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBUYWJNZW51UG9ydGFsSW50ZXJmYWNlIHtcbiAgaW50ZXJuYWxfbmFtZTogc3RyaW5nO1xuICBlbnRpdHlfaWQ6IG51bWJlcjtcbn1cblxuXG5leHBvcnQgY2xhc3MgVGFiTWVudUNvbmZpZyB7XG4gIG5hbWUgPSAnJztcbiAgZ29CYWNrID0gdHJ1ZTtcbiAgdGFiczogQXJyYXk8VGFiQ29uZmlnPiA9IFtdO1xuICBidXR0b25zOiBBcnJheTxUYWJCdXR0b25JbnRlcmZhY2U+ID0gW107XG4gIHBvcnRhbCA9IDxib29sZWFuPmZhbHNlO1xuICBtZXRhZGF0YTogRGljdGlvbmFyeTxhbnk+ID0ge307XG4gIGxvYWRlZCA9IGZhbHNlO1xuICBsb2FkaW5nID0gZmFsc2U7XG5cblxuICBjb25zdHJ1Y3RvciggcGFyYW1zPzogVGFiTWVudUludGVyZmFjZSApe1xuICAgIGlmKCBwYXJhbXMgKSBmb3IoIGNvbnN0IGkgaW4gcGFyYW1zICkgdGhpc1sgaSBdID0gcGFyYW1zWyBpIF07XG4gIH1cbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tCdXR0b24ge1xuICByZXR1cm5Vcmw6IHN0cmluZztcbiAgaGFyZFJlbG9hZDogYm9vbGVhbjtcbn0gXG5cblxuXG4iXX0=