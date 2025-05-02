import React from "react";
import "./Gradmat.css";

const Gradmat = () => {
    const data = [
        {
            title: '5TH CONGREGATION 2017',
            intro: 'It is announced for the information of 2018/2019 Academic Year Graduands of West End University College and the General Public that the 5th Congregation for the award of Degrees to persons who completed their programmes of study will be held as follows:',
            details: [
                'Date: Saturday, 25ᵗʰ January, 2020',
                'Time: 10:00 am',
                'Venue: University College Auditorium'
            ],
            fee: 'All Graduands are requested to pay an amount of Three Hundred Ghana Cedis (GH¢300.00) to cover the hiring of Gowns and Graduation Souvenirs into Account Stated below:',
            bank: [
                'Bank Name: Prudential Bank',
                'Account Name: West End University College',
                'Account Number: 0132000910012',
                'Branch: Weija'
            ],
            extras: [
                'Deadline for Payment of Congregation Materials: Wednesday, 23ʳᵈ January, 2020',
                'Rehearsals: All graduands will be required to attend rehearsals in the auditorium on Friday, 24ᵗʰ January, 2020 at 11:00 am.',
                'Distribution of Certificates: Certificates will be available for collection after the Ceremony. Graduates will be expected to show their ID Cards and Clearance Forms before collection of the certificates.',
                'Dress Code: Formal'
            ]
        },
        {
            title: '4TH CONGREGATION 2018',
            intro: 'It is announced for the information of 2017/2018 Academic Year Graduands of West End University College and the General Public that the 4th Congregation for the award of Degrees to persons who completed their programmes of study will be held as follows:',
            details: [
                'Date: Saturday, 24ᵗʰ November, 2018',
                'Time: 08:00 am',
                'Venue: University College Auditorium'
            ],
            fee: 'All Graduands are requested to pay an amount of Three Hundred and fifty Ghana Cedis (GH¢350.00) to cover the hiring of Gowns and Graduation Souvenirs into Account Stated below:',
            bank: [
                'Bank Name: Prudential Bank',
                'Account Name: West End University College',
                'Account Number: 0132000910012',
                'Branch: Weija'
            ],
            extras: [
                'Deadline for Payment: Wednesday, 21ˢᵗ November, 2018',
                'Rehearsals: Thursday and Friday, 22ⁿᵈ and 23ʳᵈ November, 2018 at 11:00 am.',
                'Distribution of Certificates: Available after the Ceremony with ID and Clearance.',
                'Dress Code: Formal'
            ]
        },
        {
            title: '3RD CONGREGATION 2017',
            intro: 'It is announced for the information of 2016/2017 Academic Year Graduands of West End University College and the General Public that the 3rd Congregation for the award of Degrees to persons who completed their programmes of study will be held as follows:',
            details: [
                'Date: Saturday, 11ᵗʰ November, 2017',
                'Time: 10:00 am',
                'Venue: University College Auditorium'
            ],
            fee: 'All Graduands are requested to pay an amount of Three Hundred Ghana Cedis (GH¢300.00) into Account Stated below:',
            bank: [
                'Bank Name: Prudential Bank',
                'Account Name: West End University College',
                'Account Number: 0132000910012',
                'Branch: Weija'
            ],
            extras: [
                'Deadline: Wednesday, 8ᵗʰ November, 2017',
                'Rehearsals: Friday, 10ᵗʰ November, 2017 at 11:00 am.',
                'Distribution of Certificates: After the Ceremony with ID and Clearance.',
                'Dress Code: Formal'
            ]
        },
        {
            title: '2ND GRADUATION CEREMONY',
            intro: 'Faculty, Staff, Graduating Students for 2015/2016 Academic Year and the Entire Students of West End University College are hereby informed that the 2nd graduation Ceremony of WEUC is scheduled as follows:',
            details: [
                'Date: Saturday, April 8, 2017',
                'Venue: WEUC Auditorium',
                'Time: 10:00 am'
            ],
            fee: 'Graduating students are to pay GHC300 into:',
            bank: [
                'Account Name: West End University College',
                'Account Number: 0132000910012',
                'Bank Name: Prudential Bank Weija branch'
            ],
            extras: [
                'Rehearsals: Friday, April 7, 2017 by 2:00 pm',
                'Arrears: All graduating students must clear arrears before March 25, 2017.'
            ]
        }
    ];

    return (
        <div className="about-container">
            <div className="about-header">
                <div className="about-header-content">
                    <h1>Graduation and Matriculation</h1>
                    <p>West End University College - Graduation and Matriculation</p>
                </div>
            </div>
            {data.map((item, index) => (
                <section key={index} className="section">
                    <h2 className="section-title">{item.title}</h2>
                    <div className="section-content">
                        <div data-aos="fade-up" className="left-column">
                            <p>{item.intro}</p>
                            <ul>
                                {item.details.map((detail, i) => (
                                    <li key={i}><strong>{detail.split(':')[0]}:</strong> {detail.split(':')[1]}</li>
                                ))}
                            </ul>
                            <p className="fee-title">Payment of Graduation Fee</p>
                            <p>{item.fee}</p>
                        </div>
                        <div className="right-column">
                            <ul>
                                {item.bank.map((info, i) => (
                                    <li key={i}><strong>{info.split(':')[0]}:</strong> {info.split(':')[1]}</li>
                                ))}
                            </ul>
                            {item.extras.map((extra, i) => (
                                <p key={i}><strong>{extra.split(':')[0]}:</strong> {extra.split(':')[1]}</p>
                            ))}
                            <p className="registrar">REGISTRAR</p>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Gradmat;
