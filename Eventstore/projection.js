options({
  resultStreamName: "order_result_Apple",
  $includeLinks: false,
  reorderEvents: false,
  processingLag: 0,
});

fromStream("orderconference")
  .when({
    $init: function () {
      return {
        sum: 2,
        users: {},
        things: {},
      };
    },
    Itemtype: function (state, event) {
      var thing = event.data.ItemName;
      state.sum = 3;
      if (!state.things.hasOwnProperty(thing)) {
        state.things[thing] = 1;
      } else {
        state.things[thing] += 1;
      }
    },
  })
  .transformBy(function (state) {
    return state;
  })
  .outputState();
