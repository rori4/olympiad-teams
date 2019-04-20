import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';
import { StatisticsService } from '../../../@core/services/statistics.service';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnInit, OnDestroy {
  private alive = true;

  progressInfoData: ProgressInfo[];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService
      .getStudentsProgressStatistics()
      .pipe(takeWhile(() => this.alive))
      .subscribe(res => {
        this.progressInfoData = res.data;
      });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
