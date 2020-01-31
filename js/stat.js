'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_SPACE = 50;
var stringsText = [
  'Ура, вы победили!',
  'Список результатов:'
];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var drawMultilineText = function (ctx, arr) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  for (var i = 0; i < stringsText.length; i++) {
    ctx.fillText(arr[i], CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP + FONT_GAP + i * FONT_GAP);
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var randomizeInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

var renderBars = function (ctx, names, times, x, y) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < times.length; i++) {
    var barCurrentHeight = BAR_HEIGHT / (maxTime / times[i]);
    var barPositionX = (BAR_SPACE + BAR_WIDTH) * i;
    var barPositionY = CLOUD_HEIGHT - barCurrentHeight;
    var barColor = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(237, 100%,' + randomizeInteger(1, 100) + '%)';

    ctx.fillStyle = barColor;
    ctx.fillRect(barPositionX + x, barPositionY - y, BAR_WIDTH, barCurrentHeight);
  }
};

var renderNames = function (ctx, names, times, x, y) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barCurrentHeight = BAR_HEIGHT / (maxTime / times[i]);
    var barPositionX = (BAR_SPACE + BAR_WIDTH) * i;
    var barPositionY = CLOUD_HEIGHT - barCurrentHeight;

    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.fillText(names[i], barPositionX + x, barPositionY - y);
  }
};

var renderTimes = function (ctx, names, times, x, y) {
  for (var i = 0; i < names.length; i++) {
    var barPositionX = (BAR_SPACE + BAR_WIDTH) * i;

    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.fillText(Math.floor(times[i]), barPositionX + x, y);
  }
};

window.renderStatistics = function (ctx, names, times) {
  var barSpaceX = CLOUD_X + GAP * 3;
  var barSpaceY = GAP * 2.5;
  var nameSpaceY = GAP * 3.5;

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');

  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  drawMultilineText(ctx, stringsText);

  renderBars(ctx, names, times, barSpaceX, barSpaceY);

  renderNames(ctx, names, times, barSpaceX, nameSpaceY);

  renderTimes(ctx, names, times, barSpaceX, CLOUD_HEIGHT - GAP / 2);

};
