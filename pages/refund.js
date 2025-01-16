import React from 'react';
import styles from './refund.module.css';

function Refund() {
  return (
    <div className={styles.refund}>
      <main>
        <div className={styles.refundContainer}>
          <h1>Refund Policy</h1>
          <h3>
            At I.R.I.S, we want to ensure that you are satisfied with our services. 
            If you are not satisfied, we offer a refund policy.
          </h3>

          <div className={styles.cardsContainer}>
            <div className={styles.policyCard}>
              <h2>Eligibility for Refunds</h2>
              <p>
                <strong>Full Refund:</strong> Participants are eligible for a full refund if they cancel 
                their registration 7 days before the hackathon start date.
              </p>
              <p>
                <strong>No Refunds:</strong> No refunds will be issued for cancellations made less than 7 days 
                before the hackathon start date or for participants who do not attend the event.
              </p>
            </div>

            <div className={styles.policyCard}>
              <h2>Refund Process</h2>
              <p>
                <strong>Request Submission:</strong> To request a refund, participants must contact us via email 
                at <a href="mailto:iris@mitwpu.edu.in">iris@mitwpu.edu.in</a> with their registration details.
              </p>
              <p>
                <strong>Processing Time:</strong> Refunds will be processed within 15-20 days after the request 
                is received and approved. The refunded amount will be returned to the original payment method 
                used during registration.
              </p>
            </div>

            <div className={styles.policyCard}>
              <h2>Event Cancellation or Postponement</h2>
              <p>
                In the event that the hackathon is canceled or postponed by I.R.I.S, participants will be 
                eligible for a full refund. Alternatively, participants may opt to transfer their registration 
                to a future event organized by I.R.I.S.
              </p>
            </div>

            <div className={styles.policyCard}>
              <h2>Non-Refundable Fees</h2>
              <p>
                Transaction processing fees incurred through third-party payment processors are non-refundable 
                unless the event is canceled by I.R.I.S.
              </p>
            </div>

            <div className={styles.policyCard}>
              <h2>Changes to This Policy</h2>
              <p>
                We reserve the right to modify this refund policy at any time. Any changes will be communicated 
                to participants via email and updated on our website.
              </p>
            </div>

            <p className={styles.text}>
              For more information, contact us at: <a href="mailto:iris@mitwpu.edu.in">iris@mitwpu.edu.in</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Refund;
