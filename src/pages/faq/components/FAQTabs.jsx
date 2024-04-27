import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "0 10px" }}>
          <h1>{children}</h1>
        </Box>
      )}
    </div>
  );
}
const FAQTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", height: "auto" }}
      className="mt-20"
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="General" sx={{ minHeight: "56px" }} />
        <Tab label="Cluster Related" sx={{ minHeight: "56px" }} />
        <Tab label="Data & Security" sx={{ minHeight: "56px" }} />
        <Tab label="Payment & Billing" sx={{ minHeight: "56px" }} />
        <Tab label="Technical" sx={{ minHeight: "56px" }} />
      </Tabs>
      <TabPanel value={value} index={0} className="flex-1">
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              What happens if there is a hardware failure on a GPU cluster I'm
              using?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              cinc.net is a decentralized GPU network designed to give unlimited
              computing power to ML applications. We make computing more
              scalable, accessible, and efficient. Our mission is to unlock fair
              access to computing power by assembling 1 million + GPUs from
              independent data centers, crypto miners, and crypto projects such
              as Fileio or Render.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>How is cinc.net different from AWS?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              cinc.net offers a fundamentally different approach to cloud
              computing, leveraging a distributed and decentralized model, which
              can provide more control and flexibility to users, our services
              are permissionless and cost efficient. The combination of all
              these factors sets cinc.net in its own league of Decentralized
              providers.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>What is a DePIN and how does cinc.net fit?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              DePIN, or Decentralized Physical Infrastructure Networks,
              leverages blockchains, IoT and the greater Web3 ecosystem to
              create, operate and maintain real-world physical infrastructure.
              These networks leverage token incentives to coordinate, reward and
              safeguard members of the network. cinc.net is the first and only
              GPU DePIN. We are optimized for machine learning but suitable for
              all GPU use cases as we connect computing power providers with
              users to offer accessibility and profit for everyone involved.
            </p>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={1} className="flex-1">
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              What's the maximum number of GPUs allowed in a single cluster?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              There is no set maximum number of GPUs in a single cluster; it
              depends on the available supply.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              What's the maximum number of GPUs allowed in a single cluster?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              Creating a Cluster with cinc.net takes less than 90 seconds.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Is it possible to adjust the number of GPUs in my cluster as my
              requirements change?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              Yes it is possible to adjust the number of GPUs either with Auto
              Scaling or manually adding nodes to your cluster.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              What is the minimum and maximum duration for GPU cluster rentals?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              The GPU cluster can be reserved for a minimum of one hour, and
              there is no maximum limit on the duration.
            </p>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={2} className="flex-1">
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              How do you preserve data privacy and security?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              Our io agent ensures that unauthorized containers are not running
              on a hired GPU to eliminate any risks. When a node is hired, the
              data existing between one worker node and the other worker node is
              encrypted in the docker file system. Any network traffic is also
              on a mesh VPN, which ensures maximum security. We also prioritize
              suppliers with SOC2 compliance and continue to stress the
              importance of SOC2 compliance with our suppliers.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Is my personal information shared with third parties or
              advertisers?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              Our company maintains a strong commitment to data privacy and does
              not share any information with third parties or advertisers.
            </p>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={3} className="flex-1">
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>Which payment methods do you accept?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              We accept a variety of payment methods, including all major credit
              cards such as Visa and MasterCard. Additionally, we also accept
              cryptocurrency payments in USDC via Solana Pay.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              How does the pricing and billing system work?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              The pricing and billing system functions on an hourly on-demand
              basis, and you will be billed at the final step of your cluster
              booking.It's worth noting that the prices are base prices and may
              be subject to change depending on your preferences.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Do you offer discounts for long-term commitments ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              Yes, we provide discounts for extended commitments. We offer a 5%
              discount on daily rentals, a 10% discount on weekly and a 20%
              discount on monthly rentals. If you're considering renting for a
              period longer than a month, please reach out to our sales team by
              completing the sales form or email us at partners@cinc.net for
              customized pricing.
            </p>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={4} className="flex-1">
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              What happens if there is a hardware failure on a GPU cluster I'm
              using?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              If a hardware failure occurs on a GPU cluster you're using, it can
              disrupt ongoing tasks and potentially lead to downtime. The impact
              depends on the redundancy and failover mechanisms in place.
              Typically, the cluster management software should detect the
              failure and redistribute tasks to functioning nodes if possible.
              However, in some cases, manual intervention might be required to
              replace or repair the faulty hardware, which could result in
              temporary service interruptions. It's crucial to have contingency
              plans, such as data backups and redundancy configurations, to
              minimize the impact of hardware failures on the cluster's
              performance and availability.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>What type of GPUs does cinc.net support?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              We offer a wide range of: GPUs, including NVIDIA RTX series, and
              AMD Ryzen series ; CPUS, including Intel, AMD, and the Apple M2
              Chip with its unparalleled neural engine. Please refer to (pricing
              page ) to see the full list of supported GPUs and contact our
              support team if your hardware is not listed.&nbsp; Our minimum
              requirements are &nbsp; +12 GB of RAM. +500 GB Free Disk Space
              Internet Speed : Download +500 MBs and +250 Mbps Upload with &lt;
              30ms ping.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary className="h-20" expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Is expert technical support provided by cinc.net?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-gray-300">
              We have a world-class support team of technicians and engineers
              available to assist you with your inquiries and address any
              technical issues you may encounter.You can submit a Support Ticket
              or email us at support@cinc.net for assistance.
            </p>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
    </Box>
  );
};

export default FAQTabs;
