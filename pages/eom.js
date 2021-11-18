import Head from "next/head";
import styles from "../styles/EOM.module.css";
import Toolbar from "../components/toolbar";

export const EOM = ({ employee }) => {
	// console.log(employee);
	return (
		<>
			<Head>
				<title>Employee Of The Month</title>
				<meta name="description" content={`This month's employee of the month is ${employee.name}`} />

				<meta property="og:image" content={employee.image} />
				<meta property="og:title" content="Employee Of The Month" />
				<meta property="og:description" content={`This month's employee of the month is ${employee.name}`} />

				<meta property="twitter:image" content={employee.image} />
				<meta property="twitter:title" content="Employee Of The Month" />
				<meta property="twitter:description" content={`This month's employee of the month is ${employee.name}`} />
			</Head>
			
			<div className="page-container">
				<Toolbar />
				<div className={styles.main}>
					<h1>Employees of the month</h1>

					<div className={styles.employeeOfTheMonth}>
						<h3>{employee.name}</h3>
						<h6>{employee.location}</h6>
						<img src={employee.avatar_url} alt={employee.name} />
						<p>{employee.bio}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (pageContext) => {
	const res = await fetch("https://api.github.com/users/gs-maker");
	const employee = await res.json();

	return {
		props: {
			employee,
		},
	};
};
export default EOM;
