const data = await d3.csv("./dataset/videogames_long.csv");

async function render() {
  const vlSpec = vl
    .markBar()
    .data(data)
    .title("Global_sales by Platform")
    .encode(
      vl.y().fieldN("platform").sort('-x'),
      vl.x().fieldQ("global_sales").aggregate("sum")
    )
    .width(800)
    .height(400)
    .toSpec();

  vegaEmbed("#view", vlSpec).then((result) => {
    const view = result.view;
    view.run();
  });
}

render();



async function render1(){
  const vlSpec = vl
  .markBar()
  .data(data)
  .title("Global_sales by Genre")
  .encode(
    vl.x().fieldN("genre").sort("-y"),
    vl.y().fieldQ("global_sales").aggregate("sum")
  )
  .width(800)
  .height(400)
  .toSpec();

  vegaEmbed("#view1", vlSpec).then((result) => {
    const view = result.view1;
    view.run();
  });
}

render1();


async function render2(){
  const vlSpec = vl
  .markCircle({stroke:'black',strokeWidth: 1})
  .data(data)
  .title("Sales Over Time by Platform")
  .encode(
    vl.x().fieldN('year'),
    vl.y().fieldN('platform'),
    vl.size().fieldQ('global_sales').aggregate('sum').scale({range: [10,1000]}),
    vl.color().fieldN('platform'),
    vl.tooltip([vl.fieldN('platform'), vl.fieldN('year')])
  )
  .width(800)
  .height(600)
  .toSpec();

  vegaEmbed("#view2",vlSpec).then((result)=>{
    const view = result.view2;
    view.run();
  })
}

render2();

async function render3(){
  const vlSpec = vl
  .markCircle({stroke:'black',strokeWidth: 1})
  .data(data)
  .title("Sales Over Time by Platform")
  .encode(
    vl.x().fieldN('year'),
    vl.y().fieldN('genre'),
    vl.size().fieldQ('global_sales').aggregate('sum').scale({range: [10,1000]}),
    vl.color().fieldN('genre'),
    vl.tooltip([vl.fieldN('genre'), vl.fieldN('year')])
  )
  .width(800)
  .height(600)
  .toSpec();

  vegaEmbed("#view3",vlSpec).then((result)=>{
    const view = result.view3;
    view.run();
  })
}

render3();

async function render4(){
  const vlSpec = vl
  .markBar()
  .data(data)
  .title("Regional Sales vs. Platform")
  .encode(
    vl.x().fieldN('platform').sort('-y'),
    vl.y().fieldQ('sales_amount').aggregate('sum'),
    vl.color().fieldN('platform'),
    //vl.tooltip(vl.fieldN('platfomr')),
    vl.facet().fieldN('sales_region').columns(2)
  )
  .width(400)
  .height(400)
  .toSpec();

  vegaEmbed("#view4",vlSpec).then((result)=>{
    const view = result.view4;
    view.run();
  })
}

render4();


const superMarioGames = data.filter((item) => {
  return typeof item.name === 'string' && item.name.includes("Super Mario")
});

async function render5(){
  const vlSpec = vl
  .markBar()
  .data(superMarioGames)
  .title("Total Sales of Super Mario Games by Region")
  .encode(
    vl.x().fieldN('name').sort('-y'),
    vl.y().fieldQ('sales_amount'),
    vl.color().fieldN('sales_region')
  )
  .width(800)
  .height(400)
  .toSpec();

  vegaEmbed("#view5",vlSpec).then((result)=>{
    const view = result.view5;
    view.run();
  })
}

render5();