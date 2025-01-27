const AdminDeposits = ({setIsLoggedIn}) => {
    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        useEffect(() => {
            const token = localStorage.getItem('admintoken');
            if (!token) {
                navigate('/admin/login');
            } else {
                setIsLoggedIn(true);
            }
        }, []);
        const fetchPendingDeposits = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/deposits/pending');
                setDeposits(response.data);
            } catch (error) {
                console.error('Error fetching deposits:', error);
            }
        };
        fetchPendingDeposits();
    }, []);

    const handleApprove = async (depositId) => {
        try {
            await axios.patch(`/api/deposits/${depositId}/approve`);
            setDeposits(deposits.filter(d => d.id !== depositId));
        } catch (error) {
            console.error('Approval failed:', error);
        }
    };

    return (
        <div>
            <h2>Pending Deposits</h2>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Method</th>
                        <th>Amount</th>
                        <th>Slip</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {deposits.map(deposit => (
                        <tr key={deposit.id}>
                            <td>{deposit.user.name}</td>
                            <td>{deposit.depositMethod}</td>
                            <td>${deposit.amount}</td>
                            <td>
                                {deposit.slipFilePath && (
                                    <a href={`/slips/${deposit.slipFilePath}`} target="_blank">
                                        View Slip
                                    </a>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleApprove(deposit.id)}>
                                    Approve
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};