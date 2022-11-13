// MOST CREDIT FOR THIS HTML AND CSS GOES TO https://github.com/sparksuite/simple-html-invoice-template/blob/master/invoice.html
// import {useState} from 'react';
function PurchaseReceipt({buyer, seller, logo, date, items, location, email}) {
    let totalPrice = 0;
  return (
    <>
    <style>{`
			.invoice-box {
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}


			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

		`}</style>
    <div className="invoice-box w-[25rem] flex-shrink-0" >
			<div className="flex justify-between items-center w-full mb-6">
								<div className="">
									<img src={logo} alt="Logo" className="w-20 h-20 rounded-full"/>
								</div>

								<div>
									<p className="">Date: {date}</p>
								</div>
                                </div>

				<div className="flex justify-between items-center w-full mb-6">

								<div>
									<p className='mb-1'>{seller}</p>
									<p>{location}</p>
								</div>
								<div>
									<p className='mb-1'>{buyer}</p>
									<p>{email}</p>
								</div>

				</div>
<table cellPadding="0" cellSpacing="0">
                <tbody>
				<tr className="heading">
					<td>Payment Method</td>
                    <td></td>
					<td>Validated</td>
				</tr>

				<tr className="details">
					<td>Card</td>
                    <td></td>
					<td>True</td>
				</tr>

				<tr className="bg-[#eee] font-bold border-b">
					<td>Item</td>
                    <td>Quantity</td>
					<td>Price</td>
				</tr>
                {items.map(item=>{
                    totalPrice+=parseInt(item.cost);
                    return <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.cost}</td>
                    </tr>
                })}

                </tbody>
			</table>
				<div className="text-center mt-4">
					<p className='font-bold'>Total: ${totalPrice}</p>
                    </div>
		</div>
        </>
  )
}

export default PurchaseReceipt