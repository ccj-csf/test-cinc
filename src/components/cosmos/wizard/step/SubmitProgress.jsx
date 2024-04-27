import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';


function SubmitProgress({ swiperRef, handleClose }) {
    const clickHandler = () => {
        console.log("Dismiss the dialog");
        handleClose();
    }
    const status = ["正在查找资源...", "资源准备中...", "正在部署...", "正在安装....", "Cluster已部署", "Cluster启动..."]
    return (<>
        <Stack direction="column" spacing={3} sx={{ width: "100%" }}>
            {
                status.map(st => {
                    return <Stack direction="row" spacing={1} key={st}>
                        <Card sx={{ display: 'flex', justifyContent: 'stretch', width: "100%", backgroundColor: "rgba(0,0,0,0)" }}>
                            <Box sx={{ padding: "15px 15px 0 15px" }}>
                                <CircularProgress />
                            </Box>
                            <Box>
                                <CardContent sx={{ width: "300px" }}>
                                    <Typography component="div" variant="body">
                                        {st}
                                    </Typography>
                                </CardContent>
                            </Box>

                        </Card>
                    </Stack>
                })
            }
            <Button variant="contained" size='large' onClick={clickHandler}>Dismiss</Button>
        </Stack>
    </>);
}

export default SubmitProgress;