<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="node()|@*">
		<graphml xmlns="http://graphml.graphdrawing.org/xmlns"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:y="http://www.yworks.com/xml/graphml"
			xmlns:yed="http://www.yworks.com/xml/yed/3"
			xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://www.yworks.com/xml/schema/graphml/1.1/ygraphml.xsd">
			<key attr.name="description" attr.type="string" for="node" id="d5" />
			<key for="node" id="d6" yfiles.type="nodegraphics" />
			<graph id="cake" edgedefault="directed">
				<xsl:for-each select="event">
					<xsl:if test="@id != ''">
						<xsl:variable name="id" select="@id" />
						<node id="{$id}">
							<data key="d5" />
							<data key="d6">
								<y:ShapeNode>
									<y:Geometry height="30.0" width="30.0" x="465.0" y="1050.0" />
									<y:Fill color="#FFCC00" transparent="false" />
									<y:BorderStyle color="#000000" type="line" width="1.0" />
									<y:NodeLabel alignment="center" autoSizePolicy="content"
										fontFamily="Dialog" fontSize="12" fontStyle="plain"
										hasBackgroundColor="false" hasLineColor="false" hasText="false"
										height="4.0" modelName="custom" textColor="#000000" visible="true"
										width="4.0" x="13.0" y="13.0">
										<y:LabelModel>
											<y:SmartNodeLabelModel distance="4.0" />
										</y:LabelModel>
										<y:ModelParameter>
											<y:SmartNodeLabelModelParameter
												labelRatioX="0.0" labelRatioY="0.0" nodeRatioX="0.0"
												nodeRatioY="0.0" offsetX="0.0" offsetY="0.0" upX="0.0" upY="-1.0" />
										</y:ModelParameter>
									</y:NodeLabel>
									<y:NodeLabel alignment="center" autoSizePolicy="content"
										fontFamily="Dialog" fontSize="12" fontStyle="plain"
										hasBackgroundColor="false" hasLineColor="false" height="18.701171875"
										modelName="custom" textColor="#000000" visible="true" width="42.701171875"
										x="-6.3505859375" y="5.6494140625">
										<xsl:value-of select="$id" />
										<y:LabelModel>
											<y:SmartNodeLabelModel distance="4.0" />
										</y:LabelModel>
										<y:ModelParameter>
											<y:SmartNodeLabelModelParameter
												labelRatioX="0.0" labelRatioY="0.0" nodeRatioX="0.0"
												nodeRatioY="0.0" offsetX="0.0" offsetY="0.0" upX="0.0" upY="-1.0" />
										</y:ModelParameter>
									</y:NodeLabel>
									<y:Shape type="rectangle" />
								</y:ShapeNode>
							</data>
						</node>
						<xsl:for-each select="./option[@href]">
							<edge id="{concat($id,'.',@href,'.',position())}" source="{$id}"
								target="{@href}" />
						</xsl:for-each>
						<xsl:for-each select="./nextevent[@href]">
							<edge id="{concat($id,'.',@href,'.',position())}" source="{$id}"
								target="{@href}" />
						</xsl:for-each>
					</xsl:if>
				</xsl:for-each>
				<!-- ERROR CORRECTION -->
				<node id="l002e002" />
				<node id="l002e003" />
				<node id="l056e000" />
				<node id="l305e0010" />
				<node id="l321e001" />
				<node id="l321e002" />
				<node id="l334e000" />
				<node id="334e000" />
				<node id="l334e001" />
				<node id="l017e002" />
				<node id="l020e000" />
				<node id="l82e000" />
				<node id="l721e001" />
				<node id="l721e002" />
				<node id="l551e001" />
				<node id="l556e001" />
				<node id="l558e000" />
				<node id="l666e666" />
				<node id="l666e667" />
			</graph>
		</graphml>
	</xsl:template>
</xsl:stylesheet>