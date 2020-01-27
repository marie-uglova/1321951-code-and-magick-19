'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 30;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_SPACE = 50;
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + FONT_GAP * 1.7);

  for (var i = 0; i < names.length; i++) {
    var barCurrentHeight = BAR_HEIGHT / (maxTime / times[i]);
    var barPositionX = CLOUD_X + GAP * 3 + (BAR_SPACE + BAR_WIDTH) * i;
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(237, 100%,' + Math.random() * 100 + '%)';
    }
    ctx.fillRect(barPositionX, CLOUD_HEIGHT - barCurrentHeight - GAP * 2.5, BAR_WIDTH, barCurrentHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], barPositionX, CLOUD_HEIGHT - barCurrentHeight - GAP * 3.5);
    ctx.fillText(Math.floor(times[i]), barPositionX, CLOUD_HEIGHT - GAP / 2);
  }
}
