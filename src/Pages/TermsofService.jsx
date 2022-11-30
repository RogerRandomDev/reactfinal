import TermSection from '../Components/TermSection';
export default function TermsofService() {
  return (
    <div className='grid grid-rows-1 mx-auto w-1/3 mt-6'>
      <h1 className='font-bold text-5xl text-center mb-8'>Terms of Service</h1>
      <TermSection
        title='OVERVIEW'
        body='By using our service, you agree to all terms and conditions listed below. In the event of a retraction (deleting your account, violating Terms of Use, etc.) you will lose your account and are subject to further punishment.'
      />
      <TermSection
        title='Section 1 - Creating an Account'
        body='Your account is stored on a private server. In the event of an account deletion, all extra money stored in the account is immediately credited to that bank account.'
      />
      <TermSection
        title='Section 2 - Purchasing Products'
        body='All products are sold by individuals or businesses. When purchasing a product, a third party will confirm your purchase. All funds arrive to the seller and do not get intercepted by any parties.'
      />
      <TermSection
        title='Section 3 - Creating a Business'
        body="All businesses are required to register an account before purchasing products. If a bank account is listed in account creation, all funds are sent to that account, otherwise put into the business owner's bank account."
      />
    </div>
  );
}
