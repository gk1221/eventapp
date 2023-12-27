options({
  resultStreamName: "order_result",
  $includeLinks: false,
  reorderEvents: false,
  processingLag: 0,
});

fromStream("orderconference")
  .when({
    $init: function () {
      return {
        sum: 0,
        user: {},
        thing: "order-UFO",
      };
    },
    "order-UFO": function (state, event) {
      state.sum = parseInt(state.sum) + parseInt(event.data.increment);
      var user = event.metadata.name;

      if (user) state.userA += parseInt(event.data.increment);
      else state.userB += parseInt(event.data.increment);
    },
  })
  .transformBy(function (state) {
    return state;
  })
  .outputState();
