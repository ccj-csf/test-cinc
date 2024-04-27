
import { Card, CardActionArea, Container } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { SvgIcon } from "@/components";
import DisabledIcon from '@mui/icons-material/Block';
import { width } from "@mui/system";
import { height } from "@mui/system";

export default function ClusterCreateBtnGrp({ buttonCallBack }) {

    const clusterBtns = [{
        type: "Ray",
        img: <SvgIcon name={`ray text-[20]`} className="text-red-500 text-5xl"></SvgIcon>,
        desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
    },
    {
        type: "Kubenates",
        img: <SvgIcon name={`kubernetes text-[20]`} className="text-red-500 text-5xl"></SvgIcon>,
        disabled: true,
        desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
    }];
    const cardClickHandler = (type) => {
        console.log('card clicked', type);
        buttonCallBack()
    }
    return (
        <Container className="my-5">
            <Grid container spacing={2}>
                {
                    clusterBtns.map((btn, idx) => {
                        let btnStyleDisabled = null;
                        if (btn.disabled) {
                            btnStyleDisabled = {
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                border: "none",
                                width: 345,
                                height: "100%",
                                color: "rgba(36,40, 50, 1)",
                                backgroundColor: "rgba(36,40, 50, 10%)",
                            }
                        }
                        return (<Grid item xs={6} key={`${btn.type}-grid`}>
                            <Card sx={{ width: 345 }}>
                                <CardActionArea disabled={btn.disabled} id={`${btn.type}-CardActionArea`} onClick={() => cardClickHandler(btn.type)}>
                                    {/* <CardMedia
                                        component="img"
                                        height="140"
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        alt="green iguana"
                                        key={`${btn.type}-CardMedia`}
                                    /> */}
                                    {/* <SvgIcon key={`${btn.type}-SvgIcon`} name={`${btn.img} text-[20]`} className="text-red-500"></SvgIcon> */}
                                    {btn.img}
                                    <CardContent key={`${btn.type}-CardContent`}>
                                        <Typography gutterBottom variant="h5" component="div" key={`${btn.type}-${idx}-Typography`}>
                                            {btn.type}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" key={`${btn.type}-${idx}-SvgIcon`}>
                                            {btn.desc}
                                        </Typography>
                                        {
                                            btn.disabled && <DisabledIcon sx={{ ...btnStyleDisabled }} />
                                            // choice.disabled && <DisabledIcon sx={{ ...btnStyleDisabled }} />
                                        }
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>)
                    }
                    )
                }

            </Grid>
        </Container>
    );

}