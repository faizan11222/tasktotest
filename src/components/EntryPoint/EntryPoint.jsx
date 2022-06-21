import React, { useEffect, useState } from 'react';

function EntryPoint() {

  const [formValue, setFormValue] = useState({
    "entryPoint": "",
    "numberPlate": "",
    "dateTime": "",
    // "time": Date()
  });

  const [data, setData] = useState([]);

  function onSubmit() {

    const Arr = [...data, formValue]
    setData(Arr)
    localStorage.setItem("input-val", JSON.stringify(Arr))
    setFormValue({
      "entryPoint": "",
      "numberPlate": "",
      "dateTime": "",
      // "time": Date()
    })
  }
  useEffect(() => {
    if (localStorage.getItem("input-val")) {
      //then pass the localStorage data to my hook that is holding all the tasks
      setData(JSON.parse(localStorage.getItem("input-val")));
    }
  }, [])


  const [formValue2, setFormValue2] = useState({
    "exitPoint": "",
    "numberPlateExit": "",
    "dateTime": ""
  });

  const [entryPointKm, setentryPointKm] = useState();

  const [exitPointKm, setexitPointKm] = useState();


  useEffect(() => {
    setentryPointKm(formValue['entryPoint'])
    setexitPointKm(formValue2['exit-point'])

  }, []);

  const entryRate = 20;
  const perKmRate = 0.2;
  const satSunRate = 0.3;
  var totelKmTraveledRate;


  const [result, setResult] = useState({
    travelDistance: 0,
    discount: 0,
    Total: 0,
    totelKmTraveledRate: 0
  });
  var Discount = 0;
  var total = 0;

  function Calculate(values) {

    const filterData = data.filter(data => data.numberPlate === values['numberPlateExit'])
    console.log(filterData);

    const kmtraveledRAW = filterData[0].entryPoint - values.exitPoint;
    var kmtraveled = Math.abs(kmtraveledRAW);

    totelKmTraveledRate = perKmRate * kmtraveled + entryRate;
    const totelKmTraveledRatef = satSunRate * kmtraveled + entryRate;


    var month = new Date(filterData[0].dateTime).getMonth() + 1; //months from 1-12
    var dayy = new Date(filterData[0].dateTime).getDate();
    var newdate = 0;
    newdate = month + "/" + dayy;

    console.log(newdate)




    //=================================Recognizing Day====================================
    const day = new Date(filterData[0].dateTime).getDay();

    const numberPlate = filterData[0].numberPlate;




    if (numberPlate % 2 === 0 && day === 1 || day === 3) {
      if (newdate === "3/23" || newdate === "8/14" || newdate === "12/25") {
        Discount = 50 / 100 * totelKmTraveledRate;
        total = totelKmTraveledRate - Discount;
        console.log("50% discount of internationsal holiday is: " + total);
      } else {
        Discount = 10 / 100 * totelKmTraveledRate;
        total = totelKmTraveledRate - Discount;
        console.log("With 10% on Monday tand Wednesday on even number vechial is " + total);
      }

    } else if (numberPlate % 2 !== 0 && day === 2 || day === 4) {

      if (newdate === "3/23" || newdate === "8/14" || newdate === "12/25") {
        Discount = 50 / 100 * totelKmTraveledRate;
        total = totelKmTraveledRate - Discount;
        console.log("50% discount of international holiday is: " + total);
      } else {
        Discount = 10 / 100 * totelKmTraveledRate;
        total = totelKmTraveledRate - Discount;
        console.log("With 10% on Tuesday and thursday on odd number vechial is " + total);
      }

    } else if (day === 5 || day === 6 || day === 0) {
      if (newdate === "3/23" || newdate === "8/14" || newdate === "12/25") {
        Discount = 50 / 100 * totelKmTraveledRate;
        total = totelKmTraveledRate - Discount;
        console.log("50% discount of internationsal holiday is: " + total);
      } else {
        total = totelKmTraveledRatef;
        console.log("Your Bill is  " + total);
      }
    }
    else {
      console.log("No Discount")

    }

    console.log(total);
    console.log(Discount);
    setResult({
      travelDistance: kmtraveled,
      discount: Discount,
      Total: total,
      totelKmTraveledRate: totelKmTraveledRate

    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,

      };
    }
    );
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    setFormValue2((prevState) => {
      return {
        ...prevState,
        [name]: value,

      };
    }
    );
  };
  return (

    <div>
      <div className='container m-5 p-5 entry-point-parent'>
        <h2 className='mx-3'>Entry</h2>
        <div className='container'>
          <div className='mt-4'>
            <select className="form-select dropdown-entry" name='entryPoint' onChange={handleChange} aria-label="Default select example" >
              <option select="true" value="0">Tap to select Interchange</option>
              <option value={5} >NS Interchange</option>
              <option value={10}>Ph4 Interchange</option>
              <option value={17}>Ferozpur Interchange</option>
              <option value={24}>Lake City Interchange</option>
              <option value={29}>Raiwand Interchange</option>
              <option value={34}>Bahria Interchange</option>
            </select>
          </div>
          <div className='mt-4 input-entry'>
            <input onChange={handleChange} className="form-control" name='numberPlate' type="text" placeholder='Number-Plate' />
          </div>
          <div className='mt-4 input-entry'>
            <input onChange={handleChange} className=" form-control" name='dateTime' type="datetime-local" placeholder='Date Time' />
          </div>
          <div className='mt-4 d-flex flex-row-reverse '>
            <button className='btn btn-success btn-lg' onClick={() => onSubmit()} >Submit</button>
          </div>

        </div>
      </div>

      <div>
        <div className='container m-5 p-5 exit-point-parent'>
          <h2 className='mx-3'>Exit</h2>
          <div className='row'>
            <div className='col-6'>
              <div className='mt-4'>
                <select className="form-select dropdown-exit" name='exitPoint' onChange={handleChange2} aria-label="Default select example" >
                  <option select="true" value="0">Tap to select Interchange</option>
                  <option value={5} >NS Interchange</option>
                  <option value={10}>Ph4 Interchange</option>
                  <option value={17}>Ferozpur Interchange</option>
                  <option value={24}>Lake City Interchange</option>
                  <option value={29}>Raiwand Interchange</option>
                  <option value={34}>Bahria Interchange</option>
                </select>
              </div>
              <div className='mt-4 input-exit'>
                <input name='numberPlateExit' onChange={handleChange2} type="text" className="form-control" placeholder='Number-Plate' />
              </div>
              <div className='mt-4 input-exit'>
                <input name='dateTime' onChange={handleChange2} type="Date" className="form-control" placeholder='Date Time' />
              </div>
              <div className='mt-4 d-flex flex-row-reverse '>
                <button className='btn btn-success btn-lg' onClick={() => Calculate(formValue2)} >Calculate</button>
              </div>
            </div>
            <div className='col-6'>
              <h3>Break Down Of Cost</h3>
              <p className='fs-5'>Base Rate: <b>{entryRate}</b> </p>
              <p className='fs-5'> Distance Cost Break Down: <b>{result.travelDistance}km</b>  </p>
              <p className='fs-5'>Sub-Total: <b>{result.totelKmTraveledRate}</b></p>
              <p className='fs-5'>Discount/ Other: <b>{result.discount.toFixed(2)}</b> </p>
              <p className='fs-5'>Total To Be Charged: <b> {result.Total}</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryPoint;
