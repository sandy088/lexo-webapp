export const mockDocuments = [
  {
    id: "doc-1",
    name: "Service Agreement.pdf",
    uploadDate: "2025-04-25T10:30:00Z",
    riskScore: 68,
    status: "analyzed",
    analysis: {
      summary:
        "This is a freelance development agreement outlining the scope of work, payment terms, timelines, intellectual property rights, termination conditions, and confidentiality. It includes a non-refundable administrative fee, late payment fees, and termination fees.",
      flags: [
        {
          type: "Hidden Fee",
          clauseText:
            "a non-refundable administrative fee of 7.9% will be added to each invoice to cover digital platform maintenance, file storage, communication bandwidth, and routine project management.",
          explanation:
            "This is a hidden fee because it is in addition to the project fee. The percentage is not insignificant, and it's important for the client to be aware of this additional cost.",
          severity: "Medium",
        },
        {
          type: "Termination Fee",
          clauseText:
            "An additional termination processing fee of $600 USD will be invoiced to cover administrative and rescheduling overhead.",
          explanation:
            "If the client terminates the contract, they will be charged an additional fee. While this is not unusual, it's important for the client to be aware of the cost of termination.",
          severity: "Medium",
        },
        {
          type: "Hidden Fee",
          clauseText:
            "Payments not made within 7 days of invoicing will incur a late fee of $35 per day, starting from the 8th day, including weekends and holidays.",
          explanation:
            "The late fee is a hidden charge that can quickly accumulate if invoices are not paid on time. This could be a significant financial burden.",
          severity: "High",
        },
        {
          type: "Ambiguity",
          clauseText:
            "Timeline is subject to change based on Client feedback responsiveness, feature revisions, and force majeure events.",
          explanation:
            "The phrase 'force majeure events' is vague and could be interpreted broadly. It isn't defined, and it could be used to justify delays.",
          severity: "Medium",
        },
        {
          type: "Unilateral Rights",
          clauseText:
            "If terminated by the Freelancer due to prolonged unresponsiveness (greater than 7 business days), the project shall be marked as completed, and no refund shall be issued.",
          explanation:
            "This clause gives the Freelancer the right to unilaterally declare the project complete and retain all payments if the client is unresponsive. This is a potentially unfair term.",
          severity: "Medium",
        },
      ],
      suggestions: [
        {
          originalClause:
            "a non-refundable administrative fee of 7.9% will be added to each invoice to cover digital platform maintenance, file storage, communication bandwidth, and routine project management.",
          suggestedRewrite:
            "A 7.9% administrative fee will be added to each invoice to cover digital platform maintenance, file storage, communication bandwidth, and routine project management. This fee is non-refundable.",
          reason: "To improve clarity and ensure the client fully understands the nature of the fee.",
        },
        {
          originalClause:
            "Payments not made within 7 days of invoicing will incur a late fee of $35 per day, starting from the 8th day, including weekends and holidays.",
          suggestedRewrite:
            "Payments not made within 7 days of invoicing will incur a late fee of $35 per day, starting from the 8th day. Late fees will not accrue on weekends or holidays.",
          reason: "To be more fair to the client. It is usual for late fees not to accrue on weekends and holidays.",
        },
        {
          originalClause:
            "Timeline is subject to change based on Client feedback responsiveness, feature revisions, and force majeure events.",
          suggestedRewrite:
            "Timeline is subject to change based on Client feedback responsiveness and feature revisions. If delays occur due to events outside of either party's control (e.g., natural disasters), the timeline will be adjusted accordingly.",
          reason: "To narrow the scope of 'force majeure' and provide examples of what constitutes such events.",
        },
        {
          originalClause:
            "If terminated by the Freelancer due to prolonged unresponsiveness (greater than 7 business days), the project shall be marked as completed, and no refund shall be issued.",
          suggestedRewrite:
            "If the Client is unresponsive for more than 7 business days, the Freelancer may pause the project. If the Client remains unresponsive for an additional 7 days, the Freelancer may terminate the agreement. In such case, the Freelancer will retain payments made up to the termination date, and any remaining work will be delivered as-is.",
          reason:
            "To provide a more gradual and fair process for dealing with client unresponsiveness, offering the client an opportunity to resume the project before termination.",
        },
      ],
    },
  },
  {
    id: "doc-2",
    name: "NDA.pdf",
    uploadDate: "2025-04-23T14:15:00Z",
    riskScore: 42,
    status: "analyzed",
    analysis: {
      summary:
        "This is a standard non-disclosure agreement with some unusual clauses regarding intellectual property and termination conditions.",
      flags: [
        {
          type: "Unusual Clause",
          clauseText:
            "All intellectual property created during discussions, even if not directly related to the disclosed information, shall be jointly owned by both parties.",
          explanation:
            "This clause extends beyond the typical scope of an NDA and could inadvertently assign IP rights that weren't intended to be shared.",
          severity: "Medium",
        },
        {
          type: "Ambiguity",
          clauseText:
            "Confidential information shall be protected for a reasonable period of time following disclosure.",
          explanation:
            "The term 'reasonable period of time' is ambiguous and could lead to disputes about when confidentiality obligations end.",
          severity: "Medium",
        },
      ],
      suggestions: [
        {
          originalClause:
            "All intellectual property created during discussions, even if not directly related to the disclosed information, shall be jointly owned by both parties.",
          suggestedRewrite:
            "Intellectual property directly resulting from the use of disclosed confidential information shall be jointly owned by both parties. All other intellectual property shall remain the property of the creating party.",
          reason:
            "To limit the scope of joint ownership to IP that actually derives from the confidential information being protected.",
        },
        {
          originalClause:
            "Confidential information shall be protected for a reasonable period of time following disclosure.",
          suggestedRewrite:
            "Confidential information shall be protected for a period of five (5) years following disclosure.",
          reason:
            "To provide a specific timeframe rather than an ambiguous 'reasonable period' that could be interpreted differently by each party.",
        },
      ],
    },
  },
  {
    id: "doc-3",
    name: "Lease Agreement.pdf",
    uploadDate: "2025-04-20T09:45:00Z",
    riskScore: 75,
    status: "analyzed",
    analysis: {
      summary:
        "This is a residential lease agreement with several concerning clauses regarding tenant responsibilities, maintenance obligations, and security deposit terms.",
      flags: [
        {
          type: "Unfair Term",
          clauseText:
            "Tenant shall be responsible for all repairs to the property, including structural and appliance repairs, regardless of cause.",
          explanation:
            "This clause unfairly shifts all maintenance responsibilities to the tenant, including repairs that would normally be the landlord's responsibility by law.",
          severity: "High",
        },
        {
          type: "Hidden Fee",
          clauseText:
            "A monthly administrative fee of $50 will be added to the rent for processing and record-keeping.",
          explanation:
            "This fee effectively increases the rent but is presented separately, potentially misleading the tenant about the true cost.",
          severity: "Medium",
        },
        {
          type: "Legal Compliance",
          clauseText:
            "Security deposit may be withheld for up to 90 days after move-out before any refund determination is made.",
          explanation:
            "This likely violates state law, as most jurisdictions require security deposit disposition within 21-30 days.",
          severity: "High",
        },
      ],
      suggestions: [
        {
          originalClause:
            "Tenant shall be responsible for all repairs to the property, including structural and appliance repairs, regardless of cause.",
          suggestedRewrite:
            "Tenant shall be responsible for minor repairs up to $100. Landlord shall be responsible for all structural repairs, appliance repairs (except when damage is caused by tenant's misuse), and any repair exceeding $100.",
          reason:
            "To align with standard legal requirements that place structural and major repair responsibilities on the landlord.",
        },
        {
          originalClause:
            "A monthly administrative fee of $50 will be added to the rent for processing and record-keeping.",
          suggestedRewrite: "The monthly rent of $X includes all administrative costs and record-keeping.",
          reason: "To incorporate all regular fees into the stated rent for transparency.",
        },
        {
          originalClause:
            "Security deposit may be withheld for up to 90 days after move-out before any refund determination is made.",
          suggestedRewrite:
            "Security deposit, less any deductions for damages beyond normal wear and tear, will be returned to Tenant within 30 days of move-out, along with an itemized statement of any deductions.",
          reason: "To comply with typical state laws regarding security deposit return timeframes.",
        },
      ],
    },
  },
  {
    id: "doc-4",
    name: "Employment Contract.pdf",
    uploadDate: "2025-04-18T16:20:00Z",
    riskScore: 35,
    status: "analyzed",
    analysis: {
      summary:
        "Standard employment agreement with reasonable terms regarding compensation, benefits, and termination conditions.",
      flags: [
        {
          type: "Non-compete",
          clauseText:
            "Employee agrees not to work for any competing business for a period of 2 years within a 100-mile radius after termination of employment.",
          explanation:
            "This non-compete clause is relatively standard but may be overly restrictive in terms of duration and geographic scope depending on the industry and jurisdiction.",
          severity: "Medium",
        },
        {
          type: "Ambiguity",
          clauseText: "Bonus compensation will be determined based on company performance and employee contribution.",
          explanation:
            "The bonus structure lacks specific metrics or criteria, which could lead to disputes about what constitutes adequate 'performance' or 'contribution'.",
          severity: "Low",
        },
      ],
      suggestions: [
        {
          originalClause:
            "Employee agrees not to work for any competing business for a period of 2 years within a 100-mile radius after termination of employment.",
          suggestedRewrite:
            "Employee agrees not to work for any directly competing business for a period of 1 year within a 50-mile radius after termination of employment. This restriction applies only to roles substantially similar to the employee's current position.",
          reason:
            "To make the non-compete more reasonable and likely to be enforceable by reducing its scope and duration.",
        },
        {
          originalClause:
            "Bonus compensation will be determined based on company performance and employee contribution.",
          suggestedRewrite:
            "Bonus compensation will be determined according to the following criteria: (1) Company achieving quarterly revenue targets of $X; (2) Employee meeting or exceeding the performance metrics outlined in Appendix A; and (3) Employee's department achieving its annual goals as determined by management.",
          reason:
            "To provide specific, measurable criteria for bonus determination, reducing ambiguity and potential disputes.",
        },
      ],
    },
  },
  {
    id: "doc-5",
    name: "Software License Agreement.pdf",
    uploadDate: "2025-04-15T11:10:00Z",
    riskScore: 52,
    status: "analyzed",
    analysis: {
      summary:
        "Software license agreement with some concerning terms regarding liability, warranty disclaimers, and automatic renewal provisions.",
      flags: [
        {
          type: "Auto-Renewal",
          clauseText:
            "This agreement will automatically renew for successive 12-month terms unless terminated in writing at least 90 days prior to the end of the current term.",
          explanation:
            "The 90-day notice period for preventing automatic renewal is unusually long and could easily be missed by customers.",
          severity: "Medium",
        },
        {
          type: "Liability Limitation",
          clauseText:
            "Under no circumstances shall the licensor's total liability exceed the amount paid by licensee in the 30 days preceding a claim, regardless of the cause or form of action.",
          explanation:
            "This extremely limited liability cap may be unenforceable and unfairly restricts customer remedies, especially for serious breaches or damages.",
          severity: "High",
        },
      ],
      suggestions: [
        {
          originalClause:
            "This agreement will automatically renew for successive 12-month terms unless terminated in writing at least 90 days prior to the end of the current term.",
          suggestedRewrite:
            "This agreement will automatically renew for successive 12-month terms unless terminated in writing at least 30 days prior to the end of the current term. Licensor will provide written notice of upcoming renewal at least 60 days before the renewal date.",
          reason:
            "To provide a more reasonable notice period and ensure the customer receives a reminder before the renewal deadline.",
        },
        {
          originalClause:
            "Under no circumstances shall the licensor's total liability exceed the amount paid by licensee in the 30 days preceding a claim, regardless of the cause or form of action.",
          suggestedRewrite:
            "Licensor's total liability shall not exceed the total amount paid by licensee in the 12 months preceding a claim, except for claims arising from licensor's gross negligence, willful misconduct, or breach of confidentiality obligations.",
          reason:
            "To provide a more reasonable liability cap that considers the full annual value of the contract and excludes certain serious breaches from the limitation.",
        },
      ],
    },
  },
  {
    id: "doc-6",
    name: "Consulting Agreement.pdf",
    uploadDate: "2025-04-10T09:30:00Z",
    riskScore: 28,
    status: "analyzed",
    analysis: {
      summary:
        "Standard consulting agreement with clear terms regarding scope of work, payment terms, and intellectual property rights.",
      flags: [
        {
          type: "Payment Terms",
          clauseText: "Payment shall be made within 45 days of invoice submission.",
          explanation:
            "45-day payment terms are longer than the standard 30 days, which may impact consultant cash flow.",
          severity: "Low",
        },
      ],
      suggestions: [
        {
          originalClause: "Payment shall be made within 45 days of invoice submission.",
          suggestedRewrite:
            "Payment shall be made within 30 days of invoice submission. Invoices not paid within this timeframe will accrue interest at 1.5% per month.",
          reason: "To align with standard industry payment terms and provide incentive for timely payment.",
        },
      ],
    },
  },
  {
    id: "doc-7",
    name: "Partnership Agreement.pdf",
    uploadDate: "2025-04-05T14:45:00Z",
    riskScore: 62,
    status: "analyzed",
    analysis: {
      summary:
        "Partnership agreement with concerning provisions regarding profit distribution, decision-making authority, and dissolution procedures.",
      flags: [
        {
          type: "Unequal Rights",
          clauseText:
            "Partner A shall have final decision-making authority on all business matters, while profits shall be distributed equally among all partners.",
          explanation:
            "This creates an imbalance where one partner has complete control but all partners share equally in profits, potentially leading to conflicts.",
          severity: "High",
        },
        {
          type: "Dissolution Terms",
          clauseText:
            "Upon dissolution, Partner A shall retain ownership of all intellectual property regardless of which partner created or contributed to its development.",
          explanation: "This unfairly assigns all IP to one partner regardless of actual contribution or creation.",
          severity: "High",
        },
      ],
      suggestions: [
        {
          originalClause:
            "Partner A shall have final decision-making authority on all business matters, while profits shall be distributed equally among all partners.",
          suggestedRewrite:
            "Major business decisions shall require approval of partners representing at least 75% of ownership interests. Day-to-day operational decisions may be made by the Managing Partner. Profits shall be distributed in proportion to each partner's ownership percentage.",
          reason:
            "To create a more balanced governance structure that aligns decision-making authority with profit distribution.",
        },
        {
          originalClause:
            "Upon dissolution, Partner A shall retain ownership of all intellectual property regardless of which partner created or contributed to its development.",
          suggestedRewrite:
            "Upon dissolution, intellectual property shall be allocated based on documented contribution to its creation. IP created jointly shall be owned jointly by the contributing partners in proportion to their documented contributions.",
          reason:
            "To ensure fair allocation of intellectual property based on actual contribution rather than arbitrary assignment.",
        },
      ],
    },
  },
]
